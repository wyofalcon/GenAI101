# GenAI101

A short, friendly crash course on the very basics of building with AI as a co-developer. The whole thing takes **1–2 hours**.

---

## What this is

A self-contained static web app. 10 modules, each with a lesson, a hands-on lab/exercise, and a quiz. 3 bundled tests at the top let you skip the modules they cover (if you pass in the time limit). One **final challenge** test unlocks at the end and is more cross-cutting.

Most lessons (Modules 2–5 and 8) have an inline **setup checklist** — you can't take the quiz (or the test that covers them) until you've ticked off the installs. Honor system, but it's in the learner's exported progress.

- No build step, no `npm install`, no backend.
- All progress lives in the learner's browser (`localStorage`) — so it stays on their device.
- Learners export their progress as JSON and send it to Nolan.
- Nolan runs `tracker/view_progress.py` to see how everyone is doing.

---

## Run it locally (the easy way)

You need any local web server. The simplest is Python's built-in one:

```bash
cd ~/projects/GenAI101
python3 -m http.server 8000
```

Then open <http://localhost:8000> in any browser. Done.

> **Why not just double-click `index.html`?** Browsers block `fetch()` calls on `file://` URLs for security, and the lessons load with `fetch`. Use the local server.

---

## Run it locally (the "experience a devcontainer" way)

This curriculum ships with its own `.devcontainer/` so students get hands-on with one while learning what one is. In VSCode:

1. Open the `GenAI101/` folder in VSCode (inside WSL).
2. Install the **Dev Containers** extension if you haven't.
3. Command palette → **"Dev Containers: Reopen in Container"**.
4. Wait a couple minutes for the container to build the first time.
5. In the integrated terminal: `python3 -m http.server 8000`
6. VSCode will auto-forward port 8000 and offer to open it in the browser.

That's the same pattern you'll use on real projects.

---

## Host it on GitHub Pages (so anyone can reach it)

The whole app is static — HTML, CSS, JS, markdown lessons. GitHub Pages serves it for free, no build step.

### One-time setup

1. Create a new GitHub repo (e.g. `GenAI101`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial GenAI101 commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/GenAI101.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages**.
4. **Source:** "Deploy from a branch."
5. **Branch:** `main` / `(root)`. Save.
6. Wait ~30 seconds. Your site is live at:
   ```
   https://<your-username>.github.io/GenAI101/
   ```

That's it. Send the URL to your learners. Their progress saves in *their own* browser's localStorage — your hosting cost is zero and their data never leaves their device. When they hit **Export progress**, they get a JSON file to send back to you.

### Updating

Edit a lesson or quiz, commit, push. GitHub Pages re-deploys in under a minute.

```bash
git add lessons/
git commit -m "Tweak module 6"
git push
```

### Custom domain (optional)

If you have a domain you want to point at it, add a `CNAME` file with just your domain in it (e.g. `learn.yourdomain.com`) and configure the DNS A records GitHub Pages shows you. The docs walk you through it: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site>.

### Alternatives if you don't want GitHub Pages

- **Netlify / Vercel / Cloudflare Pages** — same idea, drop in the folder, free static hosting.
- **A tiny ngrok tunnel** — `ngrok http 8000` while `python3 -m http.server 8000` is running, for a quick share to one person.
- **Supabase / Firebase hosting** — overkill for a static site, but if you also want server-side progress sync (instead of asking learners to email JSON), that's where you'd graduate to.

For most cases: **GitHub Pages is the answer**.

---

## How a learner uses it

1. Open the site. Enter their name.
2. Work through modules in order. Each ends with a quiz; pass with **80%** to unlock the next.
3. Or — take a **test** (top of dashboard) first. If they pass it under the time limit, all the modules it covers are skipped.
4. When done (or at any checkpoint), hit **Export progress** in the top right. Send the JSON to Nolan.
5. Hit **Reset** if they want to start over.

---

## How Nolan reviews progress

Learners email/Slack/text you their exported `.json` files. Drop them in `tracker/` (or anywhere), then:

```bash
cd ~/projects/GenAI101/tracker
python3 view_progress.py            # all .json files in this folder
python3 view_progress.py report.json
python3 view_progress.py path/to/reports/
python3 view_progress.py --json     # combined raw JSON
```

You get a per-learner readout (overall progress, time spent, modules passed, test scores, session timestamps) plus a summary table when there's more than one learner.

See `docs/instructor-guide.md` for more.

---

## What's where

```
GenAI101/
├── index.html                # app shell
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── curriculum.js     # modules, quizzes, tests — EDIT THIS to tweak content
│       ├── progress.js       # localStorage + session timing
│       ├── markdown.js       # tiny MD renderer
│       ├── quiz-engine.js    # rendering + grading
│       └── app.js            # routing + views
├── lessons/
│   ├── 01-what-is-programming.md
│   ├── 02-ai-as-codev.md         (incl. "pick your AI helper" lab)
│   ├── 03-wsl-and-terminal.md
│   ├── 04-ide-and-vscode.md
│   ├── 05-docker-devcontainers.md
│   ├── 06-python-basics.md
│   ├── 07-how-nolan-builds.md
│   ├── 08-mcps-and-addons.md
│   ├── 09-using-ai-well.md
│   └── 10-build-your-first-tool.md
├── tracker/
│   └── view_progress.py      # your instructor dashboard
├── .devcontainer/
│   └── devcontainer.json
└── docs/
    └── instructor-guide.md
```

---

## Tweaking content

- **Edit a lesson:** open the markdown file in `lessons/`. Save. Refresh the browser. Done.
- **Change a quiz question:** edit `assets/js/curriculum.js`. Each module has a `quiz: [...]` array.
- **Change a test:** same file, `TESTS` array. Each test has `covers` (module IDs it bundles), `timeLimitSec`, and `questions`.
- **Change the passing grade:** top of `curriculum.js`, `PASSING_GRADE = 0.8`.
- **Add/edit a setup checklist:** each module in `curriculum.js` can have a `setup: { title, intro, items: [...] }` block that gates the quiz on every item being checked.

---

## Built by Claude, for Nolan

This curriculum was scaffolded by Claude Opus in one session, in the same loop-based workflow it teaches. Meta on purpose.
