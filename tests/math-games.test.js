'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { topics, makeQuestion } = require('../assets/math-games.js');

function seededRandom(seed) {
  return () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
for (const grade of Object.keys(topics)) {
  test(`${grade}: 1000 questions have correct maths and unique valid choices`, () => {
    const random = seededRandom(42);
    for (let i = 0; i < 1000; i++) {
      const q = makeQuestion(grade, random);
      const v = q.values;
      const expected = {
        p1: () => v.a + v.b,
        p2: () => (Math.floor(v.number / v.scale) % 10) * v.scale,
        p3: () => v.numerator,
        p4: () => 2 * v.length + 2 * v.width,
        p5: () => v.base * v.height / 2,
        p6: () => v.total / 100 * v.percent
      }[grade]();
      assert.equal(q.answer, expected);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0);
      assert.equal(new Set(q.choices).size, q.choices.length);
      assert.equal(q.choices.filter(value => value === q.answer).length, 1);
      assert.ok(q.choices.length >= 3 && q.choices.length <= 4);
      assert.ok(q.choices.every(value => Number.isInteger(value) && value >= 0));
      assert.ok(q.prompt && q.explanation && q.visual);
      if (grade === 'p1') {
        assert.ok(q.answer <= 20);
        assert.equal([...q.visual].filter(char => char === '★').length, q.answer);
        assert.ok(q.choices.every(value => value <= 20));
      }
      if (grade === 'p2') {
        assert.ok(v.number >= 100 && v.number <= 999);
        assert.ok([1, 10, 100].includes(v.scale));
      }
      if (grade === 'p3') {
        assert.ok(v.numerator > 0 && v.numerator < v.denominator);
        assert.equal((q.visual.match(/class="filled"/g) || []).length, v.numerator);
        assert.equal((q.visual.match(/<span /g) || []).length, v.denominator);
        assert.ok(q.choices.every(value => value <= v.denominator));
      }
      if (grade === 'p4') assert.equal(q.unit, '厘米');
      if (grade === 'p5') {
        assert.equal(q.unit, '平方厘米');
        assert.ok(q.visual.includes('class="right-angle"'));
      }
      if (grade === 'p6') assert.ok(q.visual.includes(`width:${v.percent}%`));
    }
  });
  test(`${grade}: minimum and maximum random inputs terminate`, () => {
    for (const value of [0, 0.999999999]) {
      const q = makeQuestion(grade, () => value);
      assert.ok(q.choices.includes(q.answer));
      assert.ok(q.choices.length >= 3);
    }
  });
}
test('unknown grades fail explicitly', () => {
  assert.throws(() => makeQuestion('p7'), /Unknown grade/);
});
for (const grade of Object.keys(topics)) {
  test(`${grade}: scoreboard tracks answers, completion, and replay`, () => {
    function element() {
      return {
        textContent: '', hidden: false, value: 0, children: [], handlers: {},
        classList: { add() {} },
        addEventListener(name, handler) { this.handlers[name] = handler; },
        append(child) { this.children.push(child); },
        replaceChildren() { this.children = []; },
        focus() {},
        click() { if (!this.disabled) this.handlers.click(); }
      };
    }
    const elements = new Map();
    const get = id => {
      if (!elements.has(id)) elements.set(id, element());
      return elements.get(id);
    };
    const context = vm.createContext({
      document: { body: { dataset: { grade } }, getElementById: get, createElement: element }
    });
    vm.runInContext(fs.readFileSync(path.resolve(__dirname, '../assets/math-games.js'), 'utf8'), context);
    assert.equal(get('current-score').textContent, '得分：0 / 10');
    assert.match(get('round-progress').textContent, /已完成 0 \/ 10 題 · 尚餘 10 題/);
    for (let round = 1; round <= 10; round++) {
      const prompt = get('prompt').textContent;
      const numbers = prompt.match(/\d+/g).map(Number);
      const answer = {
        p1: () => numbers[0] + numbers[1],
        p2: () => Math.floor(numbers[0] / (prompt.includes('百位') ? 100 : prompt.includes('十位') ? 10 : 1)) % 10 * (prompt.includes('百位') ? 100 : prompt.includes('十位') ? 10 : 1),
        p3: () => (get('visual').innerHTML.match(/class="filled"/g) || []).length,
        p4: () => (numbers[0] + numbers[1]) * 2,
        p5: () => numbers[0] * numbers[1] / 2,
        p6: () => numbers[0] * numbers[1] / 100
      }[grade]();
      const options = get('answers').children;
      const chosen = options.find(button => round === 1
        ? parseInt(button.textContent, 10) !== answer
        : parseInt(button.textContent, 10) === answer);
      chosen.click();
      chosen.click();
      assert.equal(get('current-score').textContent, `得分：${round - 1} / 10`);
      assert.equal(get('score-meter').value, round);
      assert.ok(options.every(button => button.disabled));
      assert.equal(get('round-progress').textContent, round === 10
        ? '已完成 10 / 10 題 · 回合結束'
        : `已完成 ${round} / 10 題 · 尚餘 ${10 - round} 題`);
      get('next').click();
    }
    assert.equal(get('summary').hidden, false);
    assert.equal(get('current-score').textContent, '得分：9 / 10');
    get('restart').click();
    assert.equal(get('current-score').textContent, '得分：0 / 10');
    assert.equal(get('score-meter').value, 0);
    assert.equal(get('summary').hidden, true);
    assert.match(get('round-progress').textContent, /尚餘 10 題/);
  });
}
test('homepage game links and new game assets exist', () => {
  const root = path.resolve(__dirname, '..');
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const links = [...home.matchAll(/class="game" data-grade="(p[1-6])" href="([^"]+)"/g)];
  assert.equal(links.length, 8);
  for (const [, grade, link] of links) {
    assert.ok(link.startsWith(`./${grade}/`));
    const filename = path.resolve(root, link);
    assert.ok(fs.existsSync(filename), filename);
    const html = fs.readFileSync(filename, 'utf8');
    if (!html.includes('data-grade=')) continue;
    assert.ok(html.includes(`data-grade="${grade}"`));
    for (const [, asset] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      assert.ok(fs.existsSync(path.resolve(path.dirname(filename), asset)), asset);
    }
  }
});
