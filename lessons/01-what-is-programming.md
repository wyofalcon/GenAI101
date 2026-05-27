## Why we're starting here

Before we touch any tool — VSCode, Docker, Claude, any of it — let's make sure we share the same mental model. If you don't, every single thing that comes next will feel like a confusing pile of jargon. Five minutes here will save you hours later.

Also: a thing that bears repeating up front — **there is no single "right" way to build software.** The way we build is one way. It works for us. You'll see plenty of teams doing it differently, and most of them are also doing it right. Your job in this curriculum isn't to learn The Universal Method — it's to learn **our** method well enough to be a useful teammate.

## What programming actually is

Programming is **giving a computer a precise sequence of instructions.** That's it.

A computer cannot guess. It cannot infer. It will do exactly what you tell it, in the exact order, with no charitable reading of what you "meant." That's both its weakness (frustrating when you typo a variable name) and its strength (totally predictable once you understand the rules).

The instructions have to be written in something the computer understands. That something is a **programming language.**

## Language vs. framework vs. library vs. tool

These get used interchangeably in casual conversation and it makes everything confusing. Here's the cheat sheet:

**Language** — the grammar and vocabulary you use to write instructions. Examples: **Python**, **JavaScript**, **Go**, **Rust**. A language has rules (how you declare a variable, how you write a loop) and that's it. It doesn't know anything about websites or databases or AI.

**Library** — a pre-written bundle of code you can call when you need it. You decide when to use it. Example: in Python you might `import requests` to talk to the internet. Your code is in charge; the library waits to be called.

**Framework** — a pre-written skeleton of an *application* that you fill in. The framework is in charge of the overall shape; you plug your unique logic into the slots it provides. Examples: **React** (for websites), **FastAPI** (for backend APIs), **Expo** (for mobile apps).

> The quick way to keep them straight: **you call a library; a framework calls you.**

**Tool** — anything that helps you build, but isn't part of your app's code. Examples: **Docker** (packages your app), **VSCode** (your editor), **git** (tracks changes to your code), **Claude Code** (an AI co-developer).

So when you hear "what's the stack?" — what you'll get back is usually a mix of all four. Something like *"Python, FastAPI, PostgreSQL, Docker, deployed on Cloud Run"*. Now that mix should at least parse.

## A concrete picture

Take **CVstomize.com**, one of the projects on Nolan's portfolio. Here's how those words map onto it:

![A worked example: CVstomize.com mapped onto the four categories — Language (JavaScript), Framework (React), Library (Material-UI), and Tools (GCP Cloud Run, Firebase Auth, Docker, Gemini 2.5).](assets/img/stack-diagram.svg)


- **Language:** JavaScript (frontend), some backend code
- **Framework:** React (frontend)
- **Library:** Material-UI (pre-built UI pieces)
- **Tool:** GCP Cloud Run (where it actually runs), Firebase Auth (login)
- **AI piece:** Vertex AI / Gemini 2.5 (the "conversational resume building" engine)

One product. Five categories of stuff making it go. Don't memorize that list — just notice that every real app is a *combination* of those layers.

## "If you can think it, you can build it"

You're going to hear this a lot. It's not motivational fluff — it's a real claim about how building has changed. The bottleneck used to be **typing the syntax**: you had to know exactly how a `for` loop is spelled in C, how to set up a HTTP server, how to format JSON. That's a lot of knowledge before you could build anything real.

With Claude as your co-developer, almost all of that friction is gone. What's left is the part the AI *can't* do for you: **knowing what you actually want to build, and being able to describe it clearly.**

That's the skill we're really training in this curriculum. Everything else — Python syntax, Docker, MCPs — is just enough plumbing to make your ideas real.

## Exercise: name the layers of an app you already use

5 minutes. The goal: make the four categories (language / framework / library / tool) stick by mapping them onto something real you already use.

You'll need an AI helper — Claude, Gemini, ChatGPT, or Copilot — open in a browser tab. (Set that up in the [next lesson](lessons/02-ai-as-codev.md) if you skipped ahead.)

1. Pick an app or website you actually use a lot. Spotify. Slack. Discord. Instagram. The Verge. Whatever.
2. Open your AI helper and paste in this prompt (swap in your app):

   > *"What programming language, framework, library, and tools does Spotify (the web player) most likely use? Give me one or two best-guesses per category, in plain English, in under 150 words."*

3. Read the answer. Notice which category was easiest for the AI to be confident about (usually the framework) and which was fuzziest (often the libraries).
4. Now ask a follow-up: *"What's one thing the AI couldn't actually know for sure, and how would I find out?"*

That's it. You've now done a real "AI as search engine" loop on a topic from this lesson — and seen what categories the four-bucket model actually maps onto in the wild.

## Portfolio track: meet `my-tools`

There's a running side project that grows alongside this curriculum. By the end of Module 11, you'll have a small public site — `<your-username>.github.io/my-tools/` — with one real tool you built on it, and the muscle to keep adding to it forever.

Each module adds one small piece. Today, you don't add anything — you just know it's coming. The point: every install, every command, every habit in the next ten lessons lands on a real artifact you can point friends, recruiters, and future-you at.

Keep an eye out for the **Portfolio track** section at the end of each lesson — that's where you add the next piece.

## What to take away

- Computers do exactly what you tell them, no more, no less.
- "Language," "framework," "library," "tool" mean specific different things. Real apps mix all of them.
- There's no one right way to build software. We're teaching you ours.
- The new bottleneck isn't typing — it's clear thinking. That's what you're here to practice.

When you're ready, take the quiz to lock it in. Five questions, eighty percent to pass.
