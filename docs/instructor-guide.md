# Instructor guide (Nolan)

A short brief on how to run, watch, and iterate on this curriculum.

## Setup once

You have two options:

**Option A — host it on GitHub Pages and just send the URL.** This is the recommended setup. See the README for the 6-step deploy. After that, every learner just visits one link in their browser. No installs on their side until the lessons themselves ask them to install things.

**Option B — they run it locally.** Useful if you want them to experience the devcontainer hands-on for Module 5. Tell each learner to:

1. Clone or copy the `GenAI101/` folder to their machine.
2. Run:
   ```bash
   cd ~/projects/GenAI101
   python3 -m http.server 8000
   ```
3. Open <http://localhost:8000> in a browser.

Either way, progress saves locally in their browser's `localStorage` — so it follows their device, not their identity.

## What they see

- **Welcome screen** — enter name, hit "Let's go." No path-picker — everyone gets the same modules in the same order.
- **Dashboard** — module list (locked → unlocks as they pass quizzes) + test list (always available).
- Each module → lesson page (now with a hands-on lab in most lessons) → quiz → result (pass advances, fail offers retry).
- Tests → time-boxed, auto-submit on expire, skip modules they cover if passed in time.

## Module order (and why)

The order is deliberate — the "pick your AI helper" lesson is Module 2 specifically so learners have a working AI sidekick they can lean on for every lesson after it. If they get stuck on WSL, Docker, Python, etc., they have a helper they've already installed and tried.

```
1. What programming actually is
2. AI as your co-developer       ← picks their everyday AI helper here
3. WSL and the terminal
4. VSCode (the IDE)
5. Docker & devcontainers
6. Python — just enough
7. How we actually build (the loop)
8. MCPs, extensions, addons      ← installs Claude Code (the dev-side AI)
9. Using AI well (CLAUDE.md)
10. Build your first tool
```

## Watching progress

Have learners hit the **Export progress** button (top right) at checkpoints — after each test, end of each session, or when you ask. They'll either copy the JSON or download a file like `genai101-emily-1737830123.json`.

When you get them, drop them in `tracker/` or another folder and run:

```bash
cd ~/projects/GenAI101/tracker
python3 view_progress.py
```

You'll see:

```
========================================================================
 Emily   (genai101-emily-1737830123.json)
------------------------------------------------------------------------
 Overall progress : [############----------------]  43%
 Total time       : 1h 12m
 First session    : 2026-05-25 18:30
 Last seen        : 2026-05-25 19:42
 Modules passed   : 4
 Tests passed     : 1
 Skipped via test : m01-what-is-programming, m02-ai-as-codev

 Modules:
   m01-what-is-programming         passed       95%          0
   m02-ai-as-codev                 passed      100%          0
   m03-wsl-and-terminal            passed       80%          2
   ...

 Tests:
   test-1-foundations              passed       95%      4m 10s
   ...

 Recent sessions (3 total — showing last 3):
   2026-05-25 18:30 → 2026-05-25 19:10   (40m 12s)
   ...
```

With multiple learners, you also get a summary table at the bottom.

### Useful invocations

```bash
python3 view_progress.py                       # everything in this folder
python3 view_progress.py emily.json bo.json    # just these two
python3 view_progress.py ~/Downloads/          # whole folder
python3 view_progress.py --json                # combined raw JSON for further processing
```

## Iterating on content

- **Reword a lesson?** Edit the markdown file in `lessons/`. Refresh the browser. Done — no rebuild. (If you're on GitHub Pages, commit + push — re-deploys in under a minute.)
- **Add/remove a quiz question?** Edit the relevant module's `quiz: []` in `assets/js/curriculum.js`.
- **Change the passing grade?** Top of `curriculum.js`: `const PASSING_GRADE = 0.8;`.
- **Change a test's time limit?** That test's `timeLimitSec` in `curriculum.js`.
- **Add a new setup checklist to a module?** Add a `setup: { title, intro, items: [...] }` block. See Module 2 or 3 in `curriculum.js` for a working example.
- **Add a whole new module?** Push a new entry to the `MODULES` array (with `id`, `title`, `blurb`, `lesson` path, `quiz`), then create the lesson markdown file. Existing learners' progress JSON will still parse; new modules will show as "Not started" for them.

## When students hit walls

The most common stuck point is the very first command — opening a terminal, navigating into the folder, running the server. If you've gone the GitHub Pages route, that friction is gone for the *site itself*; the lessons still ask them to install WSL, Docker, etc. so be ready to walk them through the first one if needed.

Once they get to the end of Module 2 they'll have their AI helper installed — from there, *the helper handles most of the walls*. That's the curriculum's whole bet.

## What's intentionally missing

This isn't:

- A full Python course (lesson 6 is "just enough to be dangerous").
- A full Docker course (lesson 5 is "what it is + why we use it," not "how to write a Dockerfile").
- A CS theory course.

If they want to go deeper on any of those, they can. The curriculum is a launchpad, not the whole curriculum.
