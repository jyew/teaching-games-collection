# Learning Arcade · 學習遊戲館

A collection of browser-based learning games for students. Plain HTML, CSS, and JavaScript: no installation, build step, or backend required.

## Website

Once GitHub Pages is enabled, the homepage is:

**https://jyew.github.io/teaching-games-collection/**

Students can open the homepage to choose a game, or you can share a game's individual URL.

Games are organized by primary grade in `p1` through `p6`. Use the homepage's **全部 (All)** or **P1–P6** buttons to filter games. Grades without games show a friendly empty message. Without JavaScript, the homepage still shows all game links.

## Enable GitHub Pages (one-time setup)

1. Open https://github.com/jyew/teaching-games-collection/settings/pages as the repository owner.
2. Under **Build and deployment → Source**, select **Deploy from a branch**.
3. Select **main** and **/ (root)**, then click **Save**.
4. Wait for deployment to finish. Check the repository's **Actions** tab for progress, then return to **Settings → Pages** and click **Visit site**.
5. Enable **Enforce HTTPS** if it is available and not already checked.

Use a **public repository** for free GitHub Pages hosting with GitHub Free. A public website and repository can be viewed by anyone: do not upload student names, personal information, passwords, or API keys. A private repository does not automatically make the published website private.

## Add another game

### Current concept games

These Traditional Chinese activities practise concepts commonly taught in Hong Kong primary maths; they are not a complete syllabus or an official curriculum certification. Each new game has randomly generated questions, visual aids, explanations for correct and incorrect answers, a 10-question untimed round, and replay. No accounts, tracking, external libraries, or network access are required.

### Scores and game endings

- The six concept games show a sticky top scoreboard with **score / 10**, completed questions, questions remaining, and a progress bar. Each correct first answer earns one point; all 10 questions must be answered to finish, regardless of score. The scoreboard remains visible at the results screen and resets on replay.
- Multiplication retains its unlimited combo/speed scoring. The top display labels the score as **uncapped**, shows **remaining lives / 3**, correct answers, and seconds left for the current question. There is no fixed question total; the game ends when all three lives are lost.
- The line-chart activity shows **stages cleared / 4**, the current stage, stages remaining, and the second-stage quiz's **score / 3** (2 points to pass). These are separate measures: completing an interactive stage is not a quiz point. All four stages must be cleared to complete the adventure; cleared stages stay credited when revisiting tabs, while the second-stage quiz score resets when restarting that quiz.

| Grade | Game | Concept |
| --- | --- | --- |
| P1 | [加法星星站](p1/addition-stars.html) | Addition within 20 |
| P2 | [位值尋寶隊](p2/place-value.html) | Hundreds, tens, and ones |
| P3 | [分數拼圖屋](p3/fraction-puzzle.html) | Equal parts, numerator, and denominator |
| P4 | [周界小建築師](p4/perimeter-builder.html) | Rectangle perimeter |
| P5 | [三角形面積工房](p5/triangle-area.html) | Triangle base, perpendicular height, and area |
| P6 | [百分數探險家](p6/percentage-quest.html) | Finding a percentage of a quantity |

### Adding a homepage card

1. Save the game's HTML file in the matching grade folder (`p1`, `p2`, `p3`, `p4`, `p5`, or `p6`). For example, a P3 game could be saved as `p3/fractions-game.html`. Short filenames are convenient for sharing; existing Chinese filenames also work.
2. Include any images, sounds, CSS, or JavaScript files it needs. Use relative paths, such as `./assets/picture.png`, not local computer paths or paths starting with `/`. Filename capitalization must match exactly on GitHub Pages.
3. In [index.html](index.html), copy an existing `<a class="game">…</a>` card inside `<div class="games" id="game-list">`. Set `data-grade` to the matching folder name (for example, `data-grade="p3"`), set `href` to the game's relative path (for example, `href="./p3/fractions-game.html"`), and update its title, grade tag, other tags, and description. Uploading an HTML file does **not** automatically add a homepage card. The filters and game counts use each card's `data-grade` automatically.
4. Publish the changed files to the `main` branch. GitHub Pages will update automatically after deployment finishes.

### Publish updates without using a terminal

Open https://github.com/jyew/teaching-games-collection → **Add file → Upload files**, drag in your new or updated files, and commit to **main**. You can also edit the homepage directly on GitHub using the pencil button.

### Publish updates from VS Code

In **Source Control**, review your changes, stage the files you want to publish, enter a commit message, choose **Commit**, then **Sync Changes** (or **Push**). Do not commit private student information.

## Local preview

Open [index.html](index.html) in a browser. The current games work without a local server. For future games that use `fetch()` or JavaScript modules, use a local web server instead of opening files directly.

## Files

- [index.html](index.html): student-facing game library.
- [p1/](p1/), [p2/](p2/), [p3/](p3/), [p4/](p4/), [p5/](p5/), [p6/](p6/): grade-level games listed above.
- [assets/math-games.js](assets/math-games.js) and [assets/math-games.css](assets/math-games.css): shared logic and styles for the six new concept games. Keep the `assets` folder when copying or publishing them.
- [p2/multiplication_game.html](p2/multiplication_game.html): P2 multiplication practice game.
- [p6/折線圖大冒險_六年級互動課件.html](p6/折線圖大冒險_六年級互動課件.html): P6 line-chart activity.
- [.nojekyll](.nojekyll): serves the files directly without Jekyll processing.

The games previously stored at the repository root have moved into their grade folders. Update any previously shared direct game URLs to include `p2/` or `p6/`; the homepage URL is unchanged.

## Troubleshooting

For contributors with Node.js installed, run `node --test tests/math-games.test.js` to check question generation, mathematical answers, choices, visuals, and local links. There are no dependencies to install.

- **404 at the homepage:** check that Pages uses `main` and `/ (root)`, and that `index.html` is in the repository root. Use the full project URL above, including `/teaching-games-collection/`.
- **A game or asset returns 404:** check the relative link, spelling, and capitalization. Make sure the file was uploaded.
- **Changes are not visible:** check the latest Pages deployment in **Actions**, then refresh the browser. Deployment can take a few minutes.
- **A future game needs a server or secret API key:** GitHub Pages only hosts static files. Server-side code and secrets need a separate backend.