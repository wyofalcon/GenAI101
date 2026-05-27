## The "works on my machine" problem

Here's a story every developer has lived through. You write some code. It runs perfectly. You hand it to a teammate. It blows up on their machine. You spend two hours discovering they're on a different OS, with a different Python version, with a missing system library, and the file paths use backslashes instead of forward slashes.

That's the "works on my machine" problem. For decades it was just... the cost of doing business. Then containers happened.

## What a container is

A **container** is a lightweight, isolated environment that includes everything your app needs to run — the right operating system files, the right language version, the right libraries, the right tools — packaged together and reproducible.

Think of it like a sealed lunchbox. Inside the box: Python 3.11, the exact libraries your app needs, the right config files, your code. The lunchbox runs the same on Nolan's laptop, your laptop, a Cloud Run server in some Google datacenter, and a Raspberry Pi on someone's desk. Same box, same contents, same behavior.

It's not a virtual machine. A VM emulates a whole computer (slow, heavy, gigabytes of overhead). A container shares the host's kernel and just isolates the file system and processes. Containers start in *seconds* and weigh megabytes, not gigabytes.

![Side-by-side comparison: a VM stacks a Hypervisor and a full Guest OS under your app (heavy, slow), while a container shares the host kernel through a runtime like Docker (light, fast). Below: the clone → code . → Reopen in Container flow.](assets/img/container-vs-vm.svg)

## What Docker is

**Docker** is the tool that builds, runs, and manages containers. It's not the only one — but it's the one everyone uses, and the one our workflow assumes. When someone says "containerize your app," they almost always mean "write a Dockerfile so Docker can package it."

On Windows + WSL, Docker Desktop is the install. Once it's running, the `docker` command works from inside your WSL terminal as if Docker were native Linux. You usually won't type `docker` commands directly day-to-day — VSCode does it for you — but it's good to know what's under the hood.

> Quick way to remember it: **A container is the lunchbox. Docker is the tool that packs it and serves it.**

## What a devcontainer is specifically

A **devcontainer** is a container set up for *development*, not for production. Same Docker tech underneath, different purpose.

A production container is sealed and minimal: just your app, just what it needs to run, no extra weight. A devcontainer is generous: it includes your app's runtime *plus* the tools you write code with — git, your linter, your test runner, your debugger, your shell, sometimes even VSCode extensions pre-installed.

Devcontainers are configured by a single file in your repo:

```
your-project/
├── .devcontainer/
│   └── devcontainer.json
├── src/
└── README.md
```

That `devcontainer.json` describes which base image to use, which tools to install, which VSCode extensions to load, and how to start the environment. Commit it to git. Now anyone who clones the repo gets the same dev environment you have — no setup instructions, no "did you install Python 3.11?", no "what version of Node?".

## The magic moment

Here's the workflow that, once you've done it once, changes how you think about onboarding to a project:

```bash
git clone https://github.com/some/project.git
cd project
code .
```

VSCode opens, sees the `.devcontainer/` folder, and prompts you: **"Reopen in Container?"** You click yes. Docker builds the image (first time only, a few minutes — cached after that). VSCode reconnects, and now you're editing inside a container that has the exact runtime, exact tools, exact extensions the project needs.

No more "install these 14 things first." No more "make sure you're on this version of that." You're ready to run, test, and ship code in minutes.

This is also how Nolan and Franny stay in sync on shared projects. Same `devcontainer.json` in the repo, same environment on both laptops, even though our host setups are different.

## You get one to play with

This curriculum ships with its own `.devcontainer/` folder. After this lesson, you can clone the GenAI101 repo, open it in VSCode, reopen in container, and you'll be inside a sandbox you can experiment in safely. Break things. It's a container — throw it away and rebuild in 30 seconds.

That experimentation is the whole point. You'll never really *get* devcontainers from reading about them. You get them the first time you delete something accidentally and realize it doesn't matter, because the environment is just a file.

## Lab: open this curriculum in its own devcontainer

10 minutes. The best way to *get* devcontainers is to use one — and this curriculum ships with its own, on purpose.

The setup checklist below makes sure Docker is installed and talking to WSL. This lab takes the next step: actually opening a project in a container.

### Step 1 — Get the curriculum on your machine

If you haven't already, clone or download this repo into your WSL home. From a WSL terminal:

```bash
cd ~
mkdir -p projects
cd projects
# If Nolan gave you a git URL:
git clone <the-url-Nolan-sent-you> GenAI101
# Or if you got it as a folder, just copy it into ~/projects/GenAI101.
cd GenAI101
code .
```

### Step 2 — Reopen in container

After VSCode opens, you should see a popup in the bottom-right:

> **"Folder contains a Dev Container configuration file. Reopen folder to develop in a container."**

Click **Reopen in Container**. (If you missed the popup: `Ctrl+Shift+P` → "Dev Containers: Reopen in Container".)

First time, Docker will build the image. This takes a couple minutes. Subsequent opens are fast — Docker caches the build.

### Step 3 — Notice you're in a different world

When it finishes, the bottom-left status bar changes from `WSL: Ubuntu` to something like `Dev Container: GenAI101`. You're now editing inside the container, not directly on WSL. Open the terminal (`` Ctrl+` ``) and try:

```bash
pwd                  # /workspaces/GenAI101 (note: NOT /home/yourname/projects/...)
ls
python3 --version    # the version the container provides — may differ from your WSL one
```

That different working directory and that different Python version are the proof: this is a fresh, isolated environment, not your laptop.

### Step 4 — Run the curriculum inside its own container

While you're in here, you can run the lesson site:

```bash
python3 -m http.server 8000
```

VSCode will pop up a notification offering to open port 8000 in your browser. Click yes — you're now viewing the curriculum being *served from inside its own container.* (Meta.) This is the workflow you'll use for every real project.

### Step 5 — Get back out (when you're done)

Bottom-left status bar → click the green container indicator → "Reopen Folder in WSL". You're back on your normal WSL. The container is still there; it'll be fast next time.

### Bonus — break it

Inside the container terminal, do something dramatic: `rm -rf /workspaces/GenAI101/lessons` (don't actually run this on your real folder unless you want to test the rebuild!). Then rebuild the container (`Ctrl+Shift+P` → "Dev Containers: Rebuild Container"). The lessons come back, because the lessons live in your WSL folder and the container just mounts them. The *environment* is the container; your *code* is your folder. Knowing that split is the actual lesson.

## What to take away

- Containers solve "works on my machine" by packaging the whole environment, not just the code.
- Docker is the tool that builds and runs containers. Docker Desktop on Windows + WSL is the install.
- A devcontainer is a container tuned for *development*, configured via `.devcontainer/devcontainer.json` in the repo.
- Clone → open in VSCode → "Reopen in Container" → you have the same env as the rest of the team. That's the workflow.
- This curriculum has its own devcontainer. Use it. Break it. Rebuild it. That's how it clicks.

Next: enough Python to read and modify what Claude writes for you.
