## Claude gets more powerful when you give it hands

Out of the box, Claude can read your files and run shell commands. That's already a lot. But the real unlock — the thing that turns Claude from "smart assistant" into "co-developer who can actually do stuff in your real tools" — is **extending it.**

There are four main levers for that: **MCPs, skills, plugins, and hooks.** They sound like jargon. They're not. Let's go through them.

![Claude Code at the center, with four levers radiating out: MCPs (GitHub, Slack, Filesystem, Postgres, Drive, Canva/Figma), Skills (Daemonstrate, slash commands, your team's conventions), Plugins (TTYL, UI extensions), and Hooks (on-commit, on-stop, on-startup automations).](assets/img/mcps-and-addons.svg)

## MCP = Model Context Protocol

MCP is a standard — invented by Anthropic, now used broadly — for **connecting AI models to external tools.** Think of it as a universal adapter. Any service that exposes an MCP server can be plugged into Claude, and Claude immediately knows how to use it.

Without MCP, if you wanted Claude to read your GitHub issues, you'd have to copy-paste them in by hand. With the GitHub MCP installed, you say "look at the open issues on this repo and pick the one I should tackle next" and Claude just does it.

Some MCPs you'll run into:

- **Filesystem** — read and write files outside your current project.
- **GitHub** — issues, PRs, code search, repo metadata.
- **Slack** — read channels, post messages, search history.
- **Google Drive** — open and reference docs.
- **Canva, Figma** — design tools.
- **Postgres, SQLite, BigQuery** — databases. Claude can query your data directly.
- **Custom MCPs** — anything with an API can be wrapped as one. Nolan's **HuminLoop** is literally an MCP server that pipes screenshot/clipboard context into Claude.

> The mental shift: every MCP you add is a new thing Claude can *do*, not just talk about.

## Claude Code add-ons

MCPs are the universal layer. Claude Code itself — the CLI we use — also has its own extension system. Three pieces matter:

### Skills

A **skill** is drop-in domain expertise. It teaches Claude how to do a specific kind of task well, with the right files, conventions, and steps.

Nolan built and published one called **Daemonstrate.** When loaded, it gives Claude the ability to walk a codebase, identify the architectural scopes, and emit paired `.drawio` diagrams — one Technical version, one Plain-English version — so a non-coder can understand the system. That's a skill: Claude already knows the languages; the skill teaches it the *workflow.*

You can write skills for your own team. "How we structure a PR." "How we write a Postgres migration." "How we name React components." Drop the skill in, and every Claude session in that repo follows the conventions.

### Plugins

A **plugin** extends Claude Code itself — its interface, its behavior, what it can show you.

Nolan's **TTYL** plugin is the example. It's a floating Windows tile that pops up the moment Claude finishes a turn (so you don't have to babysit a long-running task), and it surfaces the prompt-cache TTL so you can see how cache hits are doing. That's not a skill (it's not domain knowledge) and it's not an MCP (it's not an external tool) — it's a modification of Claude Code itself.

### Slash commands

A **slash command** is a tiny saved prompt or workflow you trigger by typing `/name` in Claude Code. Think of it as a keyboard shortcut for prompts you reuse.

Examples: `/review` to kick off a PR review, `/init` to generate a fresh `CLAUDE.md` for a repo, `/verify` to run the app and confirm a change works. You can write your own in minutes. If you find yourself typing the same paragraph of context over and over, that paragraph wants to be a slash command.

### Hooks

A **hook** is an automated behavior Claude Code runs on certain events — when you start a session, when Claude finishes a turn, before a commit, after a file write. Hooks are how you encode "every time X happens, do Y" without having to remember.

Want a desktop notification when Claude is done? Hook on session end. Want every commit auto-linted? Hook on commit. Want the cache warmed when you open a project? Hook on startup.

## The bigger picture

MCPs, skills, plugins, hooks. Four levers. Each one expands what Claude can do **in your real environment**, not in some sandbox.

This is why a one-person team with a well-tuned Claude setup can ship things that used to take ten people. Not because the AI is magic — because the AI has *hands.* Every lever you wire up is one more thing the human (you) no longer has to babysit.

You don't need to install everything on day one. Start with the MCPs you actually use (GitHub and filesystem cover most people), one or two slash commands, and a hook to notify you when long jobs end. Add the rest as friction tells you to.

## Lab: install Claude Code and wire up one MCP

15 minutes. The setup checklist below handles the Claude Code install. This lab puts it to work and installs your first MCP.

### Step 1 — Install Claude Code (see the checklist)

Work through the setup checklist. By the end you should be able to run `claude --version` in a WSL terminal and get a version number.

### Step 2 — Use Claude Code on a real folder

In your terminal:

```bash
cd ~/projects/GenAI101    # or any project you have
claude
```

You're now in Claude Code. Try:

```
/init
```

This generates a `CLAUDE.md` for the project — we'll go deep on that in [Module 9](lessons/09-using-ai-well.md). For now, just watch what it produces. Skim the file. That's persistent memory Claude will read every session.

Then ask Claude something normal in chat:

```
> What does this project do? Read the README and summarize it in 3 sentences.
```

Notice: it reads your actual files. That's the difference between Claude Code and a browser chatbot.

### Step 3 — Install your first MCP

We'll add the **GitHub MCP** — most people use this within a day of installing Claude Code. From the Claude Code prompt:

```
/mcp
```

This opens the MCP management UI. Add the GitHub MCP (it'll walk you through OAuth/login). Once installed, you can ask:

```
> List the open issues on my <username>/<repo>.
```

Claude now reaches out to GitHub directly. No copy-paste required.

> Don't have a GitHub account? Either make one (free at github.com) or pick a different MCP that's relevant to you — Filesystem and Brave Search are easy first ones too.

### Step 4 — Make one slash command

Slash commands are the fastest way to feel the leverage. From Claude Code:

```
/skill
```

Pick the **make a new slash command** option (or look it up in the docs with `/help` if the UI differs). Make a simple one called `/standup` whose prompt is:

> *"Look at git log for the last 24 hours. Summarize what I did in 3 bullet points suitable for a standup."*

Save. Now from any project, you can type `/standup` and Claude runs the prompt. That's the leverage — every reused prompt becomes one keystroke.

### Step 5 — Notice what just changed

You started this lesson with a chatbot in a tab. You're ending it with an AI that:

- Lives in your terminal, on any project you `cd` into.
- Has read your code (`/init` + `CLAUDE.md`).
- Has hands into GitHub (the MCP).
- Has your own keyboard shortcut (`/standup`).

Every lever you added is a thing the AI can now do that it couldn't 15 minutes ago. Add more as friction tells you to.

## What to take away

The four levers:

- **MCPs** — connect Claude to external tools and services (GitHub, Slack, databases, your own APIs).
- **Skills** — teach Claude a specific workflow with the right conventions (like Nolan's **Daemonstrate**).
- **Plugins** — extend Claude Code itself (like Nolan's **TTYL**).
- **Hooks** — automate behavior on events (turn-end, commit, session-start).
- **Slash commands** — saved prompts you trigger with `/name`.

Every one you add is leverage. Add them as you need them, not before.
