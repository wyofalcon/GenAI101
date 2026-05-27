## Using AI well (not just using AI)

You've got the environment, you've got Claude wired up, and you've seen the loop. Now the question that separates people who get a lot out of AI from people who plateau:

**Are you using it well, or are you just using it?**

Almost everyone using Claude is leaving most of the value on the table. Not because they're doing anything wrong — because they don't know what's possible. This lesson is the part that closes that gap.

Four ideas. They sound small. Internalize them and your output multiplies.

## 1. AI is your new search engine

The first habit to break: reaching for Google.

When you hit a question — "how do I do X in Postgres," "what does this error mean," "is there a library for Y" — the default move is to type it into Google, click through three Stack Overflow tabs, mentally merge the answers, and hope you got the right one for your version.

That whole workflow is now: **ask Claude.**

Claude has read every Stack Overflow answer, every doc, every blog post. It has *also* read your code (if you're in Claude Code), so it can answer in terms of your actual project. "How do I add a Postgres index" gets you a generic answer from Google. The same question to Claude inside your repo gets you the exact migration file written against your schema, with your project's naming conventions, in your version.

Search engines give you links. AI gives you answers — tailored to your situation.

> The shift: stop typing questions into a search bar. Start typing them into Claude. Especially when you're stuck, confused, or just exploring.

When *should* you still use Google? When you need a source of truth — official docs you want to read with your own eyes, the GitHub repo of a library, a real-time status page. AI is for understanding; the web is for primary sources you want to verify.

## 2. You can't ask for tools you don't know exist

This is the quiet killer. AI lets you build basically anything you can describe — but only if you know what to describe.

A concrete example: imagine you want to "make my code look nicer when shared." A beginner asks Claude to manually reformat each snippet. Someone who knows the landscape says "set up Prettier with a `.prettierrc` and a pre-commit hook." Same goal, two completely different requests, because one person knows what tools exist and the other doesn't.

Multiply that by every dimension of your project. There's probably a:

- standard library for the thing you're hand-rolling
- linter rule that catches the bug you keep making
- CLI tool that does the workflow you've been doing manually
- MCP server (see [Module 8](#)) that gives Claude direct access to the system you're copy-pasting from
- pattern other people have already solved this exact problem with

You don't know about all of them. Nobody does. The good news: **Claude does.** So the move is to periodically ask:

> "Given what I'm trying to build, are there standard tools, libraries, or patterns I should know about that would make this easier or more idiomatic? What would a senior engineer reach for here?"

Make this a habit on every new task. Five seconds of "is there a better way?" can save you a week of building something that already exists. The biggest accelerator in your toolkit isn't writing code — it's discovering the right tool before you start.

## 3. Two paths, same destination

Because AI can build almost anything you describe, you'll end up at the same finished feature from different paths. Some paths are 10× shorter than others. Knowing the difference is most of the skill.

The two most common traps:

**Trap A: The scenic route.** You ask Claude to build a feature from scratch when a library would have done 80% of it. You end up maintaining 400 lines of custom code instead of importing `dateutil` and writing 12.

**Trap B: The wrong-shape solution.** You ask for a quick script and Claude gives you a quick script, but the *actual* shape this problem wanted was a tiny config change in a tool you already use. You now have a script to maintain forever; the right answer was three lines in a YAML file.

How to dodge both:

- Before you build, ask Claude: *"What are 2–3 different ways to solve this? What are the tradeoffs?"* — and then pick. Don't just accept the first answer.
- When something feels like a lot of work, that's a signal to stop and ask: *"Is there a simpler way? An existing tool? A library? A pattern I'm missing?"*
- Periodically zoom out: *"This codebase has feature X. Is the way it's implemented still the right shape, or has the project grown to where a different approach would be cleaner?"*

You won't always take the shortest path. That's fine. But "I asked, I considered the alternatives, I chose this on purpose" is a fundamentally different position than "I built whatever Claude suggested first."

## 4. Configure Claude — don't re-explain yourself every session

By default, every Claude session starts from zero. It doesn't know your project's conventions, your stack, your style, your goals. If you re-explain that context every time, you're wasting both your time and Claude's attention budget.

The fix: **persistent instructions.** Claude Code (and the API) reads a few specific files automatically at session start, and you can write things there that Claude will know about every single time.

The big one is `CLAUDE.md`. Drop a `CLAUDE.md` file in your project root, and Claude reads it on every session. Things to put in it:

- **What this project is.** A two-sentence description.
- **The stack.** Languages, frameworks, key libraries.
- **Conventions.** "We use snake_case for Python files." "All API endpoints live in `app/api/`." "Don't use `requests`, use `httpx`."
- **Commands.** "Run tests with `pytest -xvs`." "Start the dev server with `make dev`."
- **What to avoid.** "Don't add new dependencies without asking." "Don't edit files in `legacy/`."
- **Domain knowledge.** "A 'session' in this codebase means X. A 'workspace' means Y."

You generate the first version by running `/init` in Claude Code — it'll write a draft for you. Then you edit it.

You can also have:

- `CLAUDE.md` files **nested per-directory.** A `CLAUDE.md` inside `app/api/` applies whenever Claude touches files in that folder. Useful for big repos.
- **A user-level `CLAUDE.md`** in `~/.claude/CLAUDE.md` for your global preferences ("always run `ruff format` after editing Python," "prefer functional patterns where they fit").
- **Memory files** that the agent updates itself across sessions — facts about you, your role, recurring feedback, the project. Claude Code maintains these automatically when you say "remember that…".
- **Skills** (see [Module 8](#)) for whole reusable workflows.
- **Slash commands** for prompts you reuse.

Together these mean: the longer you work on a project, the more Claude *knows* about how you work, without you having to re-explain. That compounding is real, and it's most of the difference between a Claude session that feels magical and one that feels like teaching a new intern from scratch.

> A good `CLAUDE.md` is one of the highest-leverage 30 minutes you'll ever spend on a project.

## What this looks like as a habit

You don't have to do all four every time. But weave them in:

- **On every new task:** "Are there existing tools/libraries/patterns I should know about?"
- **Before building something that feels big:** "What are 2–3 ways to solve this, with tradeoffs?"
- **Instead of opening Google:** ask Claude.
- **On every new project:** write a `CLAUDE.md` early. Update it as you learn what's annoying you.

## Lab: build your own CLAUDE.md (and your first habit triggers)

15 minutes. By the end you'll have a real `CLAUDE.md` for a project you care about, plus a one-line cheat sheet of the four habits this lesson teaches.

### Step 1 — Pick a project (any project)

Doesn't have to be code-heavy. Even a notes folder counts. Pick something you actually open more than once a week.

```bash
cd ~/projects/<your-project>
claude
```

### Step 2 — Run `/init`

In Claude Code:

```
/init
```

Claude walks the repo, looks at file structure / README / package files, and drafts a `CLAUDE.md` for you. **Read what it produces.** Most of it will be reasonable; some of it will be guesses.

### Step 3 — Edit the draft

Open the new `CLAUDE.md` in VSCode and make it actually true. Add or fix:

- **What this project is.** Two sentences. What it does and who it's for.
- **The stack.** Languages, frameworks, key tools.
- **Conventions.** "We use snake_case." "All API endpoints live in `app/api/`." "Don't add dependencies without asking."
- **Commands.** "Run tests with `pytest -xvs`." "Start the dev server with `make dev`."
- **What to avoid.** Anything Claude could touch and shouldn't.

Save. Done. Every future Claude session in this project starts knowing all of that.

### Step 4 — Test it

Quit Claude (`Ctrl+D` or `exit`). Restart with `claude`. Ask:

```
> What stack does this project use, and how do I run the tests?
```

It should answer correctly without you re-explaining. If it doesn't, your `CLAUDE.md` is missing that info — add it.

### Step 5 — Write your four-habit cheat sheet

In a sticky note (real or digital), write these four lines. Look at them before your next three coding sessions.

```
1. Ask Claude before Google.
2. Periodically: "is there a better way to do this?"
3. Before big work: "what are 2-3 approaches with tradeoffs?"
4. Update CLAUDE.md when something annoys me twice.
```

That's the whole lesson, in 4 lines, on a sticky note. Most of the value of this curriculum sits inside those four habits.

## Portfolio track

Drop a `CLAUDE.md` at the root of `my-tools` so every future Claude session knows the project. From inside the repo:

```bash
cd ~/projects/my-tools
claude
```

Then in Claude Code:

```
/init
```

Edit the draft so it actually covers:

- **What it is.** "A static portfolio of tiny tools I built for myself, served via GitHub Pages."
- **Stack.** "Plain HTML + a single `build.py` script that regenerates the card grid from `tools/*.md`."
- **Convention.** "Each tool gets one `tools/<slug>.md` with `name:`, `description:`, `url:` front-matter."
- **Commands.** "`python3 build.py` regenerates `index.html`. `python3 -m http.server 8000` previews locally."
- **What to avoid.** "Don't edit the `<div id=\"tools\">` block in `index.html` by hand — re-run `build.py`."

Save. Now also save a slash command — call it `/new-tool` — whose prompt is:

> *"I just finished a tool in another repo. Read that repo's README, then create a `tools/<slug>.md` here with the right front-matter, run `python3 build.py`, and stage the changes on a new branch called `feat/add-<slug>`."*

That single command turns "I built a thing" into "card on the site" without you typing the steps.

## What to take away

- **AI is your search engine now.** Ask Claude before you ask Google.
- **You can't ask for tools you don't know exist** — so periodically ask Claude "is there a better way to do this?" That five-second habit is the single biggest accelerator after the build loop itself.
- **The same feature has many implementations.** Some are 10× shorter. Ask for alternatives + tradeoffs before you build.
- **Configure Claude with `CLAUDE.md`** so you stop re-explaining yourself. Add skills, slash commands, and memory as they earn their keep.

Next: pick a small thing and **build your first tool.**
