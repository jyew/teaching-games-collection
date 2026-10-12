# Learning Arcade · 學習遊戲館

A collection of browser-based learning games for students. Plain HTML, CSS, and JavaScript: no installation, build step, or backend required.

## Website

Once GitHub Pages is enabled, the homepage is:

**https://jyew.github.io/teaching-games-collection/**

Students can open the homepage to choose a game, or you can share a game's individual URL.

## Enable GitHub Pages (one-time setup)

1. Open https://github.com/jyew/teaching-games-collection/settings/pages as the repository owner.
2. Under **Build and deployment → Source**, select **Deploy from a branch**.
3. Select **main** and **/ (root)**, then click **Save**.
4. Wait for deployment to finish. Check the repository's **Actions** tab for progress, then return to **Settings → Pages** and click **Visit site**.
5. Enable **Enforce HTTPS** if it is available and not already checked.

Use a **public repository** for free GitHub Pages hosting with GitHub Free. A public website and repository can be viewed by anyone: do not upload student names, personal information, passwords, or API keys. A private repository does not automatically make the published website private.

## Add another game

1. Save the game's HTML file in this folder. Short filenames such as `fractions-game.html` are convenient for sharing; existing Chinese filenames also work.
2. Include any images, sounds, CSS, or JavaScript files it needs. Use relative paths, such as `./assets/picture.png`, not local computer paths or paths starting with `/`. Filename capitalization must match exactly on GitHub Pages.
3. In [index.html](index.html), copy an existing `<a class="game">…</a>` card inside `<div class="games">`. Update its `href`, title, tags, and description. Uploading an HTML file does **not** automatically add a homepage card.
4. Publish the changed files to the `main` branch. GitHub Pages will update automatically after deployment finishes.

### Publish updates without using a terminal

Open https://github.com/jyew/teaching-games-collection → **Add file → Upload files**, drag in your new or updated files, and commit to **main**. You can also edit the homepage directly on GitHub using the pencil button.

### Publish updates from VS Code

In **Source Control**, review your changes, stage the files you want to publish, enter a commit message, choose **Commit**, then **Sync Changes** (or **Push**). Do not commit private student information.

## Local preview

Open [index.html](index.html) in a browser. The current games work without a local server. For future games that use `fetch()` or JavaScript modules, use a local web server instead of opening files directly.

## Files

- [index.html](index.html): student-facing game library.
- [multiplication_game.html](multiplication_game.html): multiplication practice game.
- [折線圖大冒險_六年級互動課件.html](折線圖大冒險_六年級互動課件.html): Grade 6 line-chart activity.
- [.nojekyll](.nojekyll): serves the files directly without Jekyll processing.

## Troubleshooting

- **404 at the homepage:** check that Pages uses `main` and `/ (root)`, and that `index.html` is in the repository root. Use the full project URL above, including `/teaching-games-collection/`.
- **A game or asset returns 404:** check the relative link, spelling, and capitalization. Make sure the file was uploaded.
- **Changes are not visible:** check the latest Pages deployment in **Actions**, then refresh the browser. Deployment can take a few minutes.
- **A future game needs a server or secret API key:** GitHub Pages only hosts static files. Server-side code and secrets need a separate backend.