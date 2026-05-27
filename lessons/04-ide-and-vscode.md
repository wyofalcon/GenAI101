## Editor vs. IDE

A **text editor** lets you edit text. Notepad is a text editor. So is the thing your phone uses for notes. It can open a file, let you change it, and save it. That's the whole job.

An **IDE** — Integrated Development Environment — is a text editor that knows about *code*. It understands the language you're writing, highlights syntax, autocompletes as you type, jumps you to where a function is defined, runs your tests, talks to git, talks to a debugger, talks to a container, and ties a dozen other dev tools into one window. The "integrated" is the whole point: instead of juggling six tools, you have one.

You can build software in a plain editor. People do. But once you've felt a real IDE catch a typo before you save, suggest the right import, and let you click-through to read a library's source code, going back feels like writing with mittens on.

## Why VSCode

There are several good IDEs. We use **Visual Studio Code** (just "VSCode") for a few specific reasons:

1. **Free, and from Microsoft.** Funded, maintained, and not going anywhere.
2. **Fast and light.** It opens instantly. Heavier IDEs (looking at you, IntelliJ family) can take 30 seconds to launch. VSCode is ready before your coffee is.
3. **Extensions for everything.** There's a marketplace with thousands of plugins. Whatever language or tool you're using, someone wrote a good extension for it.
4. **First-class WSL and Dev Containers support.** This one matters a lot for our stack. VSCode can connect *into* WSL or *into* a running container and edit files there as if they were local. No other editor does this as smoothly.
5. **Franny and I both use it.** Less switching cost when we're pair-debugging — same shortcuts, same layout, same extensions.

> Quick way to remember it: **VSCode is the cockpit. Everything else plugs into it.**

![Anatomy of the VSCode window: activity bar on the left, file explorer, editor with a Python file open, integrated terminal at the bottom, and the WSL: Ubuntu indicator in the bottom-left status bar.](assets/img/vscode-ui.svg)

## The must-have extensions for our workflow

When you first install VSCode, it's a blank canvas. The extensions below turn it into the cockpit we actually use. Install them from the Extensions tab (the square icon in the left sidebar) or via the command palette.

- **WSL** (by Microsoft) — lets VSCode connect into your WSL environment. After installing, when you run `code .` inside WSL, this is what makes it Just Work.
- **Dev Containers** (by Microsoft) — lets VSCode open a project *inside* a Docker container. This is how we get a guaranteed-identical dev environment per project. (Whole next lesson on this.)
- **Python** (by Microsoft) — syntax highlighting, autocomplete, debugger, test runner. Non-negotiable if you're touching Python.
- **Claude Code** — if you see an official Claude extension in the marketplace, install it. It hooks Claude Code into the editor UI so you can review diffs, accept changes, and chat with Claude without leaving VSCode. (We also run Claude Code as a CLI in the terminal — having both is the move.)

That's the core four. You'll pick up others as you need them — Docker, GitLens, Prettier, language-specific ones — but don't over-install on day one. Extensions you don't use are just noise.

## The `code .` moment

Here's the workflow that ties it all together. From your WSL terminal:

```bash
cd ~/projects/GenAI101
code .
```

What just happened:

1. You navigated to your project folder in WSL.
2. `code .` launched VSCode on Windows...
3. ...but told it to connect *back into WSL* and open the current folder from there.

Look at the bottom-left corner of VSCode after it opens. You'll see something like `WSL: Ubuntu`. That's the indicator that you're editing files inside Linux, not on Windows. Every terminal you open inside VSCode (Ctrl+`) will be a WSL terminal. Every command you run will be a Linux command. Your editor is now a window into the Linux machine living inside your Windows machine.

This is the setup. Once it clicks, everything else stops feeling weird.

## Lab: get the cockpit running

10 minutes. By the end you'll have VSCode talking to WSL, with the right extensions, on a real folder.

The setup checklist below the lesson covers the installs. This lab is what you should actually *do* with them.

### Step 1 — Install + extensions (use the checklist)

Work through the setup checklist below to install VSCode and the **WSL** + **Dev Containers** extensions. Don't try to memorize what each one does — install them, then come back here.

### Step 2 — Open a real folder from inside WSL

Open a WSL terminal and run:

```bash
cd ~
mkdir -p projects/lab-vscode
cd projects/lab-vscode
echo "# Lab: VSCode" > README.md
code .
```

VSCode opens. Look at the **bottom-left corner of the window.** You should see something like `WSL: Ubuntu` in a colored badge. If you do — your editor is now living inside Linux. If you don't, the WSL extension probably needs a reload (`Ctrl+Shift+P` → "Reload Window").

### Step 3 — Open the integrated terminal

Press `` Ctrl+` `` (control + the backtick key, top-left of your keyboard). A terminal opens at the bottom of VSCode. Run `pwd` — it should print `/home/yourname/projects/lab-vscode`. That's a WSL shell, inside VSCode, in your project. This is the daily setup.

### Step 4 — Make an edit, save, see the file

In VSCode's file explorer (top-left, file icon), click `README.md`. Add a line. Save (`Ctrl+S`). Back in the terminal, run `cat README.md` — your edit is there. You just edited a Linux file from a Windows editor without thinking about it. That's the whole magic.

### Step 5 — Ask your AI helper one VSCode-specific thing

Open your everyday helper (the one you picked in [Module 2](lessons/02-ai-as-codev.md)) and ask it something like:

> *"I'm new to VSCode. What are 3 keyboard shortcuts I'll use 50 times a day?"*

Try the ones it gives you. (Hint: `Ctrl+P` is the one Nolan uses most.)

## Portfolio track

You've got an editor connected to WSL. Time to put the first page on the site.

```bash
cd ~/projects/my-tools
code .
```

In VSCode, create `index.html` with the bare bones:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>My Tools</title>
</head>
<body>
  <h1>My Tools</h1>
  <p>Small tools I built for myself.</p>
  <div id="tools"></div>
</body>
</html>
```

Drop the tagline you got from your AI helper in Module 2 into the `<p>` if you like it. Then serve the folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser. That's your portfolio site, live on your laptop. Empty so far — that's the whole point. The rest of the course fills it in.

## What to take away

- An IDE is a text editor that understands your code and integrates your dev tools. VSCode is our pick.
- Install four extensions to start: **WSL**, **Dev Containers**, **Python**, and the **Claude** extension if available.
- `code .` from a WSL terminal opens that folder in VSCode connected to WSL. Check the bottom-left for `WSL: Ubuntu` to confirm.
- Franny and I both run this exact setup, which makes pair-debugging painless.

Next: Docker and devcontainers — how we make sure your machine and my machine run code the same way.
