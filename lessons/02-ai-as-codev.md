## AI is the teammate, not a magic button

Most people meet AI as a chatbot — a thing in a browser tab you ask questions and get answers from. That's fine for many things, but it's not where the real leverage is.

For us, an AI like Claude is a **co-developer**. That means it sits next to you (in your editor, in your terminal, in your project), it reads your files, runs your commands, and writes code that goes into the same repo your work goes into. You review what it produces just like you'd review a teammate's pull request. You give it feedback, it course-corrects, you keep going.

This shifts the work. You stop spending most of your time typing syntax. You spend most of your time **deciding what to do next** and **judging whether what just got produced is right.** That's a different skill. Better news: it's a *more transferable* skill.

## The big AI labs, at a glance

You should know the landscape — even if our team uses Claude for the heavy coding work. Here are the players that matter right now:

| Company | Model family | What they're known for |
|---|---|---|
| **Anthropic** | Claude (Opus, Sonnet, Haiku) | Strong coding, careful tool use, good at long agentic tasks. Our pick for building software. |
| **OpenAI** | GPT / ChatGPT, o-series | Massive consumer reach, strong reasoning models, image generation, the broadest ecosystem. |
| **Google** | Gemini (Pro, Flash, Nano) | Deep integration with Google products (Docs, Gmail, Drive), strong multimodal, free tier on Google accounts. |
| **Microsoft** | Copilot (built on OpenAI + own models) | Wired into *everything* Microsoft — Windows, Office, Edge, GitHub, Teams. Hard to avoid if you live in that ecosystem. |
| **Meta** | Llama (open-weight) | You can download and run it yourself. Big in the open-source / self-hosted world. |
| **xAI** | Grok | Tied to X (Twitter). Different content posture than the others. |
| **DeepSeek / Mistral / Qwen / others** | various | Strong open and semi-open models. Useful when cost or self-hosting matters. |

A few honest things about all of them:

- **No single model is best at everything.** A model that wins at coding might lose at creative writing, and vice versa. Benchmarks shift every few months.
- **They all have weaknesses.** Hallucinations (confidently wrong answers), training-data cutoffs, biases. None of them are oracles.
- **They all have strengths.** Picking one is about *fit for your workflow*, not bragging rights.

## Two AI helpers, not one

Here's how we actually use AI day-to-day, and this matters:

1. **Your coding co-developer** — the one wired into your editor and terminal, editing your real files. For us, that's **Claude (via Claude Code)**. The rest of this curriculum sets that up.
2. **Your everyday helper** — the chatbot you keep open in a browser tab or as a desktop app for *non-code* questions: "explain this legal clause," "summarize this 40-page PDF," "rewrite this email." This can be a different tool than your coding one. Nolan himself uses **Gemini** for most everyday browser tasks, and Claude for coding. That's a totally normal split.

You're going to pick your everyday helper in this lesson's lab. The coding side gets set up later when we install Claude Code.

## Picking your everyday helper

You've got four good options. None of them is wrong. Pick based on *where you already live*.

### Claude Desktop (Anthropic)
- **Strengths:** Same model that's great at coding. Best-in-class at careful long-form writing, summarization, document analysis. Strong file-attachment workflow (drop in a PDF, it reads it). Best at *following instructions exactly* without going off-script.
- **Weaknesses:** No native image generation. Smaller free tier than ChatGPT or Gemini. Less ecosystem integration than Google or Microsoft tools.
- **Pick this if:** You want one consistent assistant for both coding *and* everyday use, and you mostly work in PDFs / documents / text.

### Gemini (Google)
- **Strengths:** Free and powerful tier with any Google account. Lives natively inside Gmail, Docs, Drive, Sheets — it sees your Google stuff if you let it. Strong multimodal (image, audio, video). Available everywhere on Android. **Nolan uses Gemini as his daily browser helper** for exactly these reasons.
- **Weaknesses:** Coding behavior is improving but isn't where Claude is for long agentic tasks. Privacy posture is complicated if you're sensitive about Google reading your data.
- **Pick this if:** You live in Gmail/Docs/Drive, want a strong free helper, or want the best mobile (Android) experience.

### ChatGPT (OpenAI)
- **Strengths:** The biggest brand, the most plugins, native image generation (DALL·E), strong voice mode, broadest app ecosystem. If a third-party tool integrates *one* AI, it's usually this one.
- **Weaknesses:** Free tier is limited; the good models are paid. Can be more verbose / "AI-voiced" by default than Claude or Gemini.
- **Pick this if:** You want image generation, voice conversations, or the widest range of integrations and want to dabble in everything.

### Microsoft Copilot
- **Strengths:** Built into Windows itself, Office (Word/Excel/PowerPoint/Outlook), Edge, and GitHub. If your work is in Microsoft tools, Copilot is *right there* — no separate app, no separate login, often free for personal use. Some versions can read your O365 documents directly.
- **Weaknesses:** Multiple flavors with different capabilities (Copilot, Copilot Pro, Microsoft 365 Copilot, GitHub Copilot) — easy to get confused which you have. Less "pure chatbot" focus than the others.
- **Pick this if:** You spend your day in Windows + Office + Outlook and want AI inside those apps without adopting anything new.

> Heads-up: there's also **AI that controls your browser** for you — tools like Anthropic's Computer Use, OpenAI's Operator, and browser-native agents (Comet, Arc Browse for me, Microsoft Edge Copilot Actions). You point them at a website and say "book this for me" or "fill out this form across these tabs" and they click through it themselves. Powerful, still rough around the edges. Worth knowing exists; not required for this course.

## Why we picked Claude *for coding*

A few specific reasons our team defaults to Claude for the actual building of software:

1. **Coding behavior.** It tends to make smaller, more surgical edits, asks fewer dumb questions, and reads your code carefully before changing it. That matters a lot when it's editing a real codebase.
2. **Tool use.** Claude is good at using *tools* — running commands, reading files, calling APIs — and stopping to think before doing something destructive. (See [[m08-mcps-and-addons]].)
3. **Long agentic loops.** It can run for many steps in a row without going off the rails. That's how we get features built in an afternoon that would take a team a week.
4. **Claude Code.** Anthropic's CLI tool *is* the workflow we use. It lives in your terminal, reads your repo, can edit files, run tests, and lean on extensions and MCPs. Nolan has even built and published Claude Code add-ons (**Daemonstrate**, **TTYL** — both on his portfolio).

If at some point Gemini or GPT or something newer is clearly better for what we're doing, we'll re-evaluate. But for now, for *coding*: Claude.

## "If you can think it, you can build it" — again, and on purpose

You're going to hear this phrase a lot in this curriculum. It's not a slogan, it's the operating principle.

With AI as a co-developer:

- The **idea** is the bottleneck.
- The **clarity of what you want** is the bottleneck.
- The **judgment** about whether the result is right is the bottleneck.

The typing is not the bottleneck anymore. That's the whole point.

Look at Nolan's portfolio (https://wyofalcon.github.io/Portfolio/). Projects like **NoteXT**, **CVstomize**, **HuminLoop**, **(Ai)nsworth** — those are the kinds of things small teams used to take many months to ship. He built and shipped them as one person leveraging Claude. Not because he's secretly a 50-person engineering team. Because the bottleneck moved.

## Lab: pick your AI helper and put it to work

This lab takes about 10 minutes. By the end you'll have a helper installed (or bookmarked), you'll have used it once, and you'll have your first instinct for when to reach for it.

You'll find the setup checklist for this right below the lesson — that's what gates the quiz. Work through it as you read.

### Step 1 — Pick one

Look at the four options above. Don't agonize. Pick the one that fits where you already are:

- Already live in Google? → **Gemini.**
- Already live in Microsoft Office / Windows? → **Copilot.**
- Want the same brand as the coding side of the course? → **Claude Desktop.**
- Want image generation, voice, the widest integrations? → **ChatGPT.**

You can switch later. The goal is to have *one* you reach for by default so you stop second-guessing every time.

### Step 2 — Install or sign in

- **Claude Desktop:** download from claude.ai (top-right "Get the desktop app") or use claude.ai in your browser. Free tier is solid.
- **Gemini:** go to gemini.google.com and sign in with any Google account. There's also a Gemini app on Android and iOS. If you're on Android, the Assistant is being replaced by Gemini — it might already be on your phone.
- **ChatGPT:** chatgpt.com, sign up free. Desktop apps for Mac/Windows are at openai.com/chatgpt/download.
- **Copilot:** on Windows 11 it's already there — press the Copilot key on your keyboard (or `Win + C`). Also at copilot.microsoft.com. For Office, it shows up inside Word/Excel/Outlook if you have the right subscription.

### Step 3 — Try a real prompt

Don't just say "hi" and quit. Pick a real thing you actually need to do today and try it. Examples:

- "Summarize this PDF into 5 bullet points." (Attach a real PDF.)
- "Rewrite this email so it's two sentences shorter and a bit warmer." (Paste a draft.)
- "I'm trying to learn what WSL does — explain it like I'm new to dev, in under 100 words."
- "What's the difference between Python and JavaScript? I'm trying to decide what to learn first."

Notice how the answer feels. Is it specific? Did it follow your instructions? That's the muscle you're building — *judging the output*, not just consuming it.

### Step 4 — Bookmark it / pin it

Pin the tab. Add the app to your taskbar. Put it on your phone. Friction kills habits — if your helper is one click away, you'll use it. If it's three clicks away, you won't.

> A reminder that bears repeating: the helper you picked is for **everyday browser/document work.** When we get to coding, we'll install **Claude Code** in your terminal as the dev-side co-developer. It's normal to use two different AIs for two different jobs.

## Portfolio track

You just picked an everyday helper. Use it once, right now, on the side project.

Open the helper and paste:

> *"I'm going to build a small public site called `my-tools` — a portfolio of tiny tools I build for myself. As I go through a 1–2 hour intro course, I'll add one tool at a time. Help me draft a single-sentence pitch for it, in plain English, no marketing voice."*

Save the answer to a scratch note. You'll drop it onto the live site in Module 4.

## What to take away

- AI is your co-developer — not a chat toy and not a magic button.
- Several big AI labs exist. They each have strengths. None is best at everything.
- Most people end up with **two AI helpers**: one for everyday browser work, one wired into their coding environment. They don't have to be the same brand.
- For everyday use, **pick the one that fits where you already work** (Gemini for Google folks, Copilot for Microsoft folks, Claude for documents/text-heavy work, ChatGPT for image/voice/breadth).
- For coding, we picked **Claude** because of how it behaves as a coding partner and tool user, not because the others are bad.
- The real skill you're building is **clear thinking + good judgment**. The AI handles the typing.

Next module: WSL and the terminal — the foundation your dev environment will live on. (And once you have your helper picked, lean on it every time something here trips you up. That's the workflow from now on.)
