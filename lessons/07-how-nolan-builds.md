## The loop is the whole game

You've now seen the tools — WSL, the terminal, your editor, the devcontainer, Claude. Tools alone don't ship anything. What ships things is **how you use them, in what order, with what habits.** That's what this lesson is about.

There's no single right way to build software. The loop below is **our** way. It works for us because it keeps the human (you) in charge of decisions and the AI (Claude) in charge of typing. Steal it, adapt it, eventually replace it with your own — but learn it well first.

## Get clear before you code

The single biggest leverage point in this whole workflow happens *before* you open Claude. It's the 60 seconds you spend writing down what you actually want.

Fuzzy goal in, fuzzy output out. Every time. If your ask is "make the dashboard better," you will get something back, you will not like it, and you will not be able to say why. If your ask is "add a filter at the top of the dashboard that lets the user hide rows older than 30 days, default off, persists in localStorage" — now Claude has something to actually build, and you have something to actually judge.

> If you can't write down in one paragraph what "done" looks like, you're not ready to prompt yet. Go think for another minute.

## Brief Claude like a smart teammate who just walked in

Imagine a sharp engineer just sat down next to you. They know languages and frameworks deeply, but they know nothing about *your* project. What do they need from you to be useful in the next ten minutes?

- **Goal.** What are we trying to do?
- **Context.** What's the relevant file, function, or piece of the system?
- **What you've tried.** Saves them from re-walking your dead ends.
- **What "done" looks like.** What should be true when this works?

That's also exactly the brief Claude needs. Not more, not less. A good prompt is rarely long — it's *specific.*

## Tight feedback loops

The most common mistake new users make: they prompt Claude, walk away for an hour, come back, and find a sprawling change across twelve files that doesn't quite work. Now they have to either accept a mess they don't understand or throw it all out.

Don't do that. Work in **small steps:**

1. Ask for one focused change.
2. Run it.
3. Look at the real result — the running app, the test output, the actual file.
4. Correct.
5. Next step.

Each loop should be minutes, not hours. The shorter your loops, the less wrong Claude can go before you catch it.

## Review what it writes

Code from Claude is code from a teammate. Same standard. You don't merge a teammate's PR without reading it; don't accept Claude's diff without reading it either.

This is non-negotiable for two reasons. One, Claude is occasionally wrong in ways that look right. Two, the only way you'll actually learn the codebase is by reading the diffs as they happen. The reviewers who skip this step end up six months in not understanding their own project. Don't be that person.

When something looks off, push back. "That's not what I meant — the filter needs to persist, not just apply once." Claude responds to correction. Use it.

## Course-correct in place

When Claude wanders off — wrong file, wrong assumption, wrong approach — the instinct is often to start a fresh conversation. Resist that. Starting over throws away all the context you just built up.

Instead, **steer.** Give it the missing piece: "You're editing the wrong file — the filter logic lives in `dashboard/filters.py`, not in the component." Or: "Stop. Back up. The user is logged-in only on this route, so we don't need the auth check." Claude is built to absorb mid-stream corrections. Use that.

## Ship small things often

A toy that runs end-to-end on day one beats a beautiful architecture diagram that doesn't run on day thirty. Always.

Look at the projects on Nolan's portfolio — **NoteXT**, **CVstomize**, **HuminLoop**, **TTYL**. None of those started as the finished thing. Every one of them started as a crappy v0 that did one thing badly, and got shaped into the real product through dozens of small loops.

That's how real software gets made. Not in one heroic sprint. In a thousand small corrections.

## Exercise: run one full loop on something tiny

15 minutes. The point isn't to ship anything serious — it's to *feel* the loop end-to-end, once, with no stakes.

### Step 1 — Write the one-paragraph spec

In a notes app or a scratch file, write **one paragraph** describing a tiny script you actually want. Examples:

- "A Python script I run in my terminal that takes a sentence as input and prints back the word count, the average word length, and the longest word."
- "A script that reads a folder of `.txt` files and prints the filename and first line of each, one per line."
- "A script that opens a URL I paste in, fetches the page title, and prints it."

Don't open your AI helper yet. Get the spec clear first.

### Step 2 — Hand the spec to your AI helper

Open the helper you picked in [Module 2](lessons/02-ai-as-codev.md). Paste the paragraph and ask:

> *"Write the smallest single-file Python script that does exactly this. No extras, no error handling I don't need yet. Show me the file and tell me how to run it."*

### Step 3 — Run it

Save the file in your `~/projects/` somewhere. Run it with `python3 your_script.py`. Did it work?

- **If yes:** move to step 4.
- **If no:** copy the error, paste it back to the AI with "this is what happened, fix it." Loop until it runs.

### Step 4 — Use it on a real input

Don't stop at "the parts work." Actually feed it real input — a real sentence, a real folder, a real URL. Notice anything awkward.

### Step 5 — One correction

Pick the **one** thing that annoyed you the most. Don't list ten. Pick one. Tell your AI:

> *"This part is awkward: \[describe the friction\]. Fix only that. Don't touch the rest."*

Run it again. Done.

You just did: **think → prompt → run → look → correct → repeat.** That's the entire workflow this curriculum is built around. Everything else is decoration.

## Portfolio track

You now have a working `my-tools` site. Apply the loop to *itself.*

Use the site for two minutes. Resize the browser. Click the placeholder card. Look at the source. Notice everything that annoys you — even tiny things. Then create `FRICTION.md` at the root of the repo and write one line per annoyance. Don't fix anything yet.

A starter list to react to (yours will look different):

- Cards look like raw links — no styling at all.
- No way to tell which tools are new vs old.
- I have to remember to run `build.py` by hand.
- The page title still says "My Tools" verbatim — could be my actual name.

Pick **one** for next session. The smallest, most painful one. That's the loop, applied to the very thing you're building it on.

## What to take away

The loop, named explicitly:

**think → prompt → run → look → correct → repeat**

![A circular diagram of the build loop: six nodes — think, prompt, run, look, correct, repeat — each arrow pointing clockwise to the next, closing back to think.](assets/img/build-loop.svg)


- Think before you prompt. One paragraph of clarity is worth ten of vague intention.
- Brief Claude with goal, context, what you tried, what done looks like.
- Keep loops short. Run it, look at it, correct.
- Read what it writes. Push back when it's wrong.
- Steer mid-stream instead of starting over.
- Ship a small thing today, not a perfect thing eventually.

That's the whole workflow. Everything else is plumbing.
