/* Shared by the six grade-level concept games. */
'use strict';

const MathGames = (() => {
  const topics = {
    p1: { title: '加法星星站', concept: '20 以內的加法', tip: '把兩組星星合起來，數一數共有多少顆。' },
    p2: { title: '位值尋寶隊', concept: '三位數的百位、十位和個位', tip: '數字的位置決定它的值：1 個百是 100，1 個十是 10。' },
    p3: { title: '分數拼圖屋', concept: '等分與分數', tip: '分母表示平均分成多少份，分子表示取了多少份。' },
    p4: { title: '周界小建築師', concept: '長方形的周界', tip: '周界是圖形四周的總長：長方形周界 =（長 + 闊）× 2。' },
    p5: { title: '三角形面積工房', concept: '三角形的底、高與面積', tip: '三角形面積 = 底 × 高 ÷ 2。高必須與底垂直。' },
    p6: { title: '百分數探險家', concept: '求一個數的百分之幾', tip: '百分之幾就是一百份中的幾份：部分 = 全部 × 百分率 ÷ 100。' }
  };
  const randomInt = (min, max, random) => min + Math.floor(random() * (max - min + 1));
  function shuffle(values, random) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = randomInt(0, i, random);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function makeQuestion(grade, random = Math.random) {
    if (!topics[grade]) throw new Error(`Unknown grade: ${grade}`);
    let prompt, answer, explanation, visual;
    let unit = '';
    const values = {};
    if (grade === 'p1') {
      const a = randomInt(1, 10, random);
      const b = randomInt(1, 20 - a, random);
      Object.assign(values, { a, b });
      answer = a + b;
      prompt = `${a} + ${b} = ?`;
      explanation = `先數 ${a} 顆，再多數 ${b} 顆，合共有 ${answer} 顆。${a} + ${b} = ${answer}。`;
      visual = `<div class="star-groups"><span>${'★'.repeat(a)}</span><b>+</b><span>${'★'.repeat(b)}</span></div>`;
    } else if (grade === 'p2') {
      const number = randomInt(100, 999, random);
      const place = randomInt(0, 2, random);
      const scale = [1, 10, 100][place];
      const digit = Math.floor(number / scale) % 10;
      const name = ['個', '十', '百'][place];
      Object.assign(values, { number, scale, digit });
      answer = digit * scale;
      prompt = `${number} 的${name}位數字 ${digit}，代表的值是多少？`;
      explanation = `${digit} 在${name}位，代表 ${digit} 個${name}，所以是 ${digit} × ${scale} = ${answer}。`;
      const digits = String(number).split('');
      visual = `<div class="place-grid">${['百位', '十位', '個位'].map((label, i) => `<div class="${2 - i === place ? 'highlight' : ''}">${label}<strong>${digits[i]}</strong></div>`).join('')}</div>`;
    } else if (grade === 'p3') {
      const denominator = randomInt(2, 10, random);
      const numerator = randomInt(1, denominator - 1, random);
      Object.assign(values, { numerator, denominator });
      answer = numerator;
      prompt = `把整條平均分成 ${denominator} 份，塗色部分是幾分之幾？選出分子：□ / ${denominator}`;
      explanation = `整條平均分成 ${denominator} 份，其中 ${numerator} 份塗了色，所以是 ${numerator}/${denominator}。分子是 ${numerator}。`;
      visual = `<div class="fraction-bar" role="img" aria-label="平均分成 ${denominator} 份，其中 ${numerator} 份塗色">${Array.from({ length: denominator }, (_, i) => `<span class="${i < numerator ? 'filled' : ''}"></span>`).join('')}</div><p>整條代表 1</p>`;
    } else if (grade === 'p4') {
      const length = randomInt(5, 15, random);
      const width = randomInt(2, length - 1, random);
      Object.assign(values, { length, width });
      answer = (length + width) * 2;
      unit = '厘米';
      prompt = `長方形長 ${length} 厘米、闊 ${width} 厘米。周界是多少厘米？`;
      explanation = `四條邊加起來：${length} + ${width} + ${length} + ${width} = ${answer} 厘米，也就是（${length} + ${width}）× 2。`;
      visual = `<svg viewBox="0 0 320 180" aria-hidden="true"><rect x="65" y="35" width="190" height="105" rx="3"/><text x="160" y="24">${length} 厘米</text><text x="286" y="94">${width} 厘米</text></svg><p>示意圖，不按比例繪畫</p>`;
    } else if (grade === 'p5') {
      const base = randomInt(2, 10, random) * 2;
      const height = randomInt(3, 12, random);
      Object.assign(values, { base, height });
      answer = base * height / 2;
      unit = '平方厘米';
      prompt = `三角形的底是 ${base} 厘米，高是 ${height} 厘米。面積是多少平方厘米？`;
      explanation = `底 × 高 ÷ 2 = ${base} × ${height} ÷ 2 = ${answer} 平方厘米。不能忘記除以 2！`;
      visual = `<svg viewBox="0 0 320 200" aria-hidden="true"><path d="M50 155 L255 155 L130 30 Z"/><path class="height" d="M130 30 V155"/><path class="right-angle" d="M130 140 H145 V155"/><text x="158" y="185">底 ${base} 厘米</text><text x="255" y="80">高 ${height} 厘米</text></svg><p>虛線是高，與底成直角。示意圖不按比例繪畫。</p>`;
    } else {
      const total = randomInt(2, 10, random) * 20;
      const percent = [10, 20, 25, 50, 75][randomInt(0, 4, random)];
      Object.assign(values, { total, percent });
      answer = total * percent / 100;
      unit = '個';
      prompt = `共有 ${total} 個方塊，其中 ${percent}% 是綠色。綠色方塊有多少個？`;
      explanation = `${percent}% = ${percent}/100，所以 ${total} × ${percent} ÷ 100 = ${answer} 個。`;
      visual = `<div class="percent-bar"><span style="width:${percent}%"></span></div><p>綠色佔 ${percent}%；整條代表 ${total} 個方塊。</p>`;
    }
    const choices = new Set([answer]);
    const offsets = shuffle([-3, -2, -1, 1, 2, 3, 4, 5], random);
    for (const offset of offsets) {
      const candidate = answer + offset;
      const maximum = grade === 'p1' ? 20 : grade === 'p3' ? values.denominator : Infinity;
      if (candidate >= 0 && candidate <= maximum) choices.add(candidate);
      if (choices.size === 4) break;
    }
    // Small fraction denominators may have fewer than four valid numerators.
    return { prompt, answer, explanation, visual, unit, values, choices: shuffle([...choices], random) };
  }
  return { topics, makeQuestion };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = MathGames;

if (typeof document !== 'undefined') {
  const grade = document.body.dataset.grade;
  const topic = MathGames.topics[grade];
  if (!topic) throw new Error(`Missing game configuration: ${grade}`);
  const get = id => document.getElementById(id);
  get('title').textContent = topic.title;
  get('concept').textContent = `${grade.toUpperCase()} · ${topic.concept}`;
  get('tip').textContent = topic.tip;
  const total = 10;
  let question, round, score, answered;

  function showQuestion() {
    answered = false;
    question = MathGames.makeQuestion(grade);
    get('progress').textContent = `第 ${round} / ${total} 題 · 答對 ${score} 題`;
    get('meter').value = round - 1;
    get('prompt').textContent = question.prompt;
    get('visual').innerHTML = question.visual;
    get('answers').replaceChildren();
    get('feedback').textContent = '';
    get('next').hidden = true;
    for (const value of question.choices) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${value}${question.unit ? ` ${question.unit}` : ''}`;
      button.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = value === question.answer;
        if (correct) score++;
        for (const choice of get('answers').children) {
          choice.disabled = true;
          if (choice.textContent === `${question.answer}${question.unit ? ` ${question.unit}` : ''}`) choice.classList.add('correct');
        }
        if (!correct) button.classList.add('incorrect');
        get('feedback').textContent = `${correct ? '答對了！' : '再學一學：'}${question.explanation}`;
        get('progress').textContent = `第 ${round} / ${total} 題 · 答對 ${score} 題`;
        get('meter').value = round;
        get('next').textContent = round === total ? '查看成績' : '下一題';
        get('next').hidden = false;
        get('next').focus();
      });
      get('answers').append(button);
    }
    get('prompt').focus();
  }
  function start() {
    round = 1;
    score = 0;
    get('summary').hidden = true;
    get('play').hidden = false;
    showQuestion();
  }
  get('next').addEventListener('click', () => {
    if (!answered) return;
    if (round < total) {
      round++;
      showQuestion();
    } else {
      get('play').hidden = true;
      get('summary').hidden = false;
      get('result').textContent = `你答對了 ${score} / ${total} 題！`;
      get('encouragement').textContent = score === total ? '全部答對，概念掌握得很好！' : '完成挑戰了！看看每題的解說，再試一次，會更熟練。';
      get('result').focus();
    }
  });
  get('restart').addEventListener('click', start);
  get('loading').hidden = true;
  start();
}
