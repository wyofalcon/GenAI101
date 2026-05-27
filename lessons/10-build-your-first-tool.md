## Now go build something

You've read a lot. You've installed a lot. You've watched the workflow described from every angle. None of it will stick until you build something real with it.

This lesson is the on-ramp to that. By the end you'll have a project idea, a build loop to follow, and no remaining excuse not to start.

## What makes a good first build

Three rules. Break them at your own risk.

**1. Small.** If you can describe it in one paragraph and someone non-technical understands it, the scope is probably right. If you find yourself saying "and then it also does…" five times, cut.

**2. Useful to YOU.** Not "useful to small businesses" or "useful to my hypothetical user." Useful to *you,* this week, on a task you actually do. Why? Because you'll use it. And the act of using your own tool every day is what tells you what to fix next. A tool nobody uses dies in a folder.

**3. End-to-end in an afternoon.** v0 should run, badly, the same day you start. Not a polished v1 — a duct-tape v0 that takes input, does the thing, and produces output. Polish comes later, on the back of a working spine.

What a **bad** first build looks like: "I'm going to clone Notion." "I'm going to build a social network." "I'm going to build a better ChatGPT." These die in week two. Every time. Don't.

> A working toy beats an unfinished masterpiece. Every time, in every domain.

## Project ideas

Pick one of these or use them as inspiration. All of them are buildable in an afternoon with Claude as your co-developer.

- **Daily standup helper.** A CLI you run each morning. It reads your git log from the last 24 hours across a few repos, hands the diff summary to Claude, and gets back a clean "what I did yesterday" bullet list ready to paste into Slack.

- **Screenshot-to-text clipper.** Hit a shortcut, screenshot a region of the screen, send the image to a vision-capable model, get the extracted text dropped on your clipboard. Two-second tool, used a hundred times a week.

- **Scratchpad with auto-tags.** A tiny CLI or web page where you dump quick notes. On save, Claude reads the note, suggests 1–3 tags, and writes the file as Markdown to a notes folder. Later you grep by tag.

- **Diagram-to-English companion.** Pairs with Nolan's **Daemonstrate** skill: you point it at a `.drawio` file and get back a plain-English walkthrough of what the diagram shows. Useful when you want to send a non-technical person the explanation, not the picture.

- **Meeting-notes summarizer.** Paste in raw transcript text (from Zoom, Otter, whatever), get back two clean sections: **Decisions** and **Action items (with owners).** Nothing else. The discipline of those two buckets is the value.

- **PR-in-plain-English helper.** A CLI you point at a PR URL. It pulls the diff via the GitHub MCP, asks Claude to summarize what changed in plain English, and outputs a 3–5 sentence description suitable for a non-engineer stakeholder.

Pick the one that, if it existed right now, you'd actually use today.

## The build loop, in 6 steps

1. **Write a one-paragraph spec.** What goes in, what comes out, what "done" looks like. Don't open Claude yet.
2. **Ask Claude to scaffold v1.** Hand it the spec. Ask for the smallest version that runs end-to-end. One file is fine.
3. **Get it running end-to-end.** Not "the parts work in isolation." Actually run the whole thing on real input. Fix until it does.
4. **Use it on a real task.** The next time the task comes up in your real workflow, use the tool instead of doing it by hand.
5. **Note every friction point.** Keep a tiny file open. Every time the tool annoys you, write the friction down in one line. Don't fix yet.
6. **Fix the top one. Repeat.** Pick the single most painful friction. Fix only that. Use again. New friction list. Loop.

That loop — used honestly, weekly — is how a v0 becomes a tool people would pay for. It's how **NoteXT** and **HuminLoop** got built. It's how every project on Nolan's portfolio got built.

## Don't ship what you don't understand

One last thing, because it bears repeating: **read what Claude writes.** All of it. Before you run it, before you commit it, before you use it on your real data.

You will be tempted, especially when the tool is small and you're moving fast, to skim. Don't. The five minutes you spend reading the diff is the five minutes that catches the bug, teaches you the pattern, and earns you the right to actually call this code yours.

A tool whose source you don't understand is not a tool you built. It's a tool that was assembled near you.

## Capstone lab: pick one, build the spine today

This is the capstone. Don't read past it without doing it.

You're not going to finish a polished tool in this lab. You're going to get a v0 that *runs end-to-end* — and you're going to use it on a real task before the day ends.

### Step 1 — Pick (5 minutes)

Look at the project ideas above. Pick **one** that, if it existed right now, you'd use today. Not next week — today. Don't agonize. Pick.

### Step 2 — Write the one-paragraph spec (5 minutes)

Open a scratch file. Write one paragraph that answers:

- What goes in (input)?
- What comes out (output)?
- What does "this works" mean?

Don't open Claude yet. Get the spec clean first. If you can't write the paragraph, your idea isn't clear enough — talk to your AI helper *about the idea* until it is.

### Step 3 — Scaffold v0 with Claude Code (15 minutes)

In a WSL terminal:

```bash
cd ~/projects
mkdir -p my-first-tool
cd my-first-tool
claude
```

In Claude Code:

```
> Here's the spec: [paste your paragraph]
> Build the smallest single-file version that takes real input and produces real output. No fancy error handling, no config files, no tests yet. One file. Show me the file and how to run it.
```

Read what Claude writes. Don't skim. **You should be able to explain every line out loud.** If you can't, ask Claude to walk you through the parts you don't get before you accept it.

### Step 4 — Run it end-to-end on real input (10 minutes)

Save the file. Run it on a real input — your real notes folder, your real meeting transcript, your real screenshot, whatever your spec called for. Fix until it works.

### Step 5 — Use it on a real task today (no timer)

This is the part most people skip. **Actually use the tool** the next time the task comes up. Don't admire it, don't show it off, just use it.

### Step 6 — Note one friction (5 minutes)

After using it once or twice, open a `FRICTION.md` next to your script. Write **one line** for each annoying thing. Don't fix anything yet.

### Step 7 — Fix the worst one (next session)

Next session, pick the single most painful friction. Have Claude fix just that. Run again. Repeat.

That's the loop that turns a v0 toy into a real tool. Use it weekly, on the same tool, for a month. By the end you'll have something that's actually useful — and a feel for how every project on Nolan's portfolio got built.

## Portfolio track

You just built v0 of a real tool. Now ship the card.

In your `my-tools` repo:

```bash
cd ~/projects/my-tools
git checkout -b feat/add-<your-tool-slug>
```

Either write the card by hand — a new `tools/<your-tool-slug>.md` with `name:`, `description:`, `url:` front-matter — or in Claude Code:

```
/new-tool
```

(That's the slash command you saved in Module 9.) Either way, you should end up with a fresh `tools/<your-tool-slug>.md`, a regenerated `index.html`, and a branch ready to push.

Don't merge to main yet. We'll do that, properly, in the next lesson.

## What to take away

- Small, useful-to-you, end-to-end in an afternoon. Those are the rules.
- Pick a real task you do regularly. Build the tool that removes the boring part.
- Follow the loop: spec → scaffold → run → use → note friction → fix the worst one → repeat.
- Read every line Claude writes before you ship it.

You've now got everything you need. The terminal, the devcontainer, Claude, the loop, the workflow, the project. The only thing left is to pick something and start.

> If you can think it, you can build it. Now go think of one.
