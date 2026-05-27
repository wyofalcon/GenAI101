## Why Linux, even on Windows

Here's the awkward truth about modern software: almost every server in the world runs Linux, almost every dev tool assumes Linux, and almost every tutorial you'll read shows Linux commands. If you're on Windows (Nolan is), that's a problem — until WSL.

**WSL (Windows Subsystem for Linux)** is Microsoft's official way to run a real Linux environment *inside* Windows. Not a virtual machine you boot into. Not a dual-boot setup where you pick an OS at startup. A real Linux kernel running side-by-side with Windows, with its own filesystem, its own package manager, its own everything — and you can pop in and out of it from a normal Windows terminal.

You install it once (`wsl --install` in PowerShell, pick Ubuntu) and from then on, when we say "open a terminal," we mean *open your WSL terminal*. That's where your code lives, where Docker runs, where Claude Code runs, where everything happens.

> The quick way to remember it: **Windows is your desktop. WSL is your workshop.**

![A Windows window with a WSL Ubuntu terminal running inside it. The terminal shows a typical morning: cd into a project, ls to see what's there, code . to open it in VSCode.](assets/img/wsl-diagram.svg)

## What "the terminal" actually is

A terminal is a window where you type commands instead of clicking buttons. That's it. No mystique. Every command you type runs a program, and that program prints something back (or doesn't, if it succeeded silently — Unix tools are quiet on purpose).

If you've only ever used graphical apps, this feels backwards at first. Stick with it for a day and it flips: the terminal is *faster* than clicking for almost anything a developer does, because you can chain commands, repeat them, and script them.

## The commands you'll actually use on day one

You do not need to learn 200 commands. You need about seven. Here they are, with what they do:

```bash
pwd          # "print working directory" — where am I right now?
ls           # "list" — what files/folders are in here?
ls -la       # same, but show hidden files and details
cd folder    # "change directory" — go into a folder
cd ..        # go up one folder
cd ~         # go to your home folder (your default workspace)
mkdir name   # "make directory" — create a new folder
cat file.txt # print the contents of a file to the terminal
clear        # wipe the screen (your history is still there, just scrolled off)
code .       # open the current folder in VSCode (more on this next lesson)
```

That's enough to navigate any project, peek at files, and open things in your editor. Everything else you'll pick up as you need it — or ask Claude.

## Where your files live: WSL vs. Windows

This trips people up, so let's nail it down.

WSL has its own filesystem. Your "home" in WSL is `~` (which expands to something like `/home/yourname`). **This is where your projects should live.** Code in `~` runs fast, plays nicely with Docker, and behaves the way every Linux tool expects.

Your Windows drives are still reachable from WSL — they're mounted under `/mnt/`. So your Windows `C:\Users\You\Documents` shows up at `/mnt/c/Users/You/Documents`. You *can* work there. You shouldn't. It's much slower (crossing the Windows/Linux filesystem boundary on every read), and some tools misbehave.

> The rule: **code lives in `~`. `/mnt/c` is just a bridge for occasionally grabbing a file.**

From the other direction, you can browse WSL files from Windows File Explorer — type `\\wsl$\` in the address bar and you'll see your distros. Handy for dragging files in. But day-to-day, stay in the terminal.

## A quick tour

A typical morning for Nolan looks roughly like this:

```bash
cd ~/projects/some-project # jump into the project
ls                         # see what's there
code .                     # open it in VSCode (connected to WSL)
```

Three commands. You're now in your project, in your editor, in a real Linux environment. From here Claude Code, Docker, Python — all of it — is one step away. We'll layer those on in the next lessons.

## Lab: get on the terminal

Reading about the terminal is one thing — using it is another. This lab takes about 10 minutes and gets the commands above into your fingers.

You'll need a working WSL terminal to do it. If you haven't installed WSL yet, do that first:

### Step 0 — Install WSL (Windows only — skip if you're already on Mac/Linux or WSL is set up)

1. Open **PowerShell as Administrator** (right-click the Start menu → "Terminal (Admin)" or "PowerShell (Admin)").
2. Run:
   ```powershell
   wsl --install
   ```
3. Reboot if it asks.
4. After reboot, a window opens asking you to set a **Linux username and password**. Pick something memorable — you'll type the password occasionally for admin (`sudo`) commands. It is *not* the same as your Windows password.
5. Confirm it worked:
   ```powershell
   wsl --version
   ```
   You should see a version number. From now on, when we say "open a terminal," open this one — search for "Ubuntu" in your Start menu, or just type `wsl` in any Windows terminal.

> Hit a wall during install? This is the perfect moment to practice asking Claude (or Google) about the *exact* error message. Don't paraphrase — copy/paste it.

### Step 1 — Where am I?

Open your WSL terminal. The prompt looks something like `you@laptop:~$`. The `~` is shorthand for your home folder. Try:

```bash
pwd
```

You'll see something like `/home/you`. That `/home/you` is the *real* path; `~` is just a shortcut. Now list what's in there:

```bash
ls
ls -la
```

The first `ls` probably shows almost nothing (fresh WSL installs are empty). `ls -la` shows the *hidden* files too — anything starting with `.` is hidden by default. You'll see things like `.bashrc` and `.profile`. Those are your shell's config files. Don't touch them yet — just notice they exist.

### Step 2 — Build a little file tree

Let's make a folder for your projects and poke around. Type these one at a time:

```bash
cd ~                       # make sure you're home
mkdir projects             # create a "projects" folder
cd projects                # go into it
pwd                        # confirm — should print /home/yourname/projects
mkdir hello-terminal       # create a project folder
cd hello-terminal
echo "Hello from the terminal" > greeting.txt
ls
cat greeting.txt
```

What just happened: you made two nested folders, created a text file with the `echo > file` trick, listed the folder to confirm it's there, and printed the file's contents. You just did with seven commands what would have been a dozen mouse clicks in File Explorer.

### Step 3 — Climb the tree

The filesystem is a tree. Your home (`/home/yourname`) lives inside `/home`, which lives inside `/` (the root of everything). Let's walk up it:

```bash
pwd            # /home/yourname/projects/hello-terminal
cd ..          # up one level → /home/yourname/projects
pwd
cd ..          # up again → /home/yourname
pwd
cd ..          # → /home
ls             # you'll see your own user folder, and maybe others
cd /           # jump all the way to the root
ls             # this is the whole Linux filesystem at a glance
```

You're now looking at folders like `bin`, `etc`, `home`, `usr`, `var`, `mnt`. A quick translation:

- `home/` — where users live (you're under here)
- `bin/`, `usr/bin/` — installed programs
- `etc/` — system config files
- `var/` — logs and changing data
- `mnt/` — *mounted* drives. This is where your Windows C: drive shows up

Peek at the Windows bridge:

```bash
ls /mnt/c           # you should see your Windows drive contents
```

That's your `C:\` from inside Linux. Cool — but remember the rule from earlier: **don't work there**. It's slow, and tools misbehave across the boundary.

### Step 4 — Back home, the fast way

```bash
cd ~                       # straight back to your home
cd projects/hello-terminal # jump multiple levels in one go
pwd
```

You don't have to climb one level at a time. `cd` takes a whole path.

### Step 5 — Clean up (optional)

If you want to delete the practice folder:

```bash
cd ~
rm -r projects/hello-terminal
```

`rm -r` removes a folder and everything inside it. **There is no trash bin** — files deleted in the terminal are gone. Be slow and deliberate the first few times you use `rm`.

### What you should feel after this lab

- A little bit of "oh, that's it?" The terminal stops feeling like wizardry.
- Comfort with `pwd`, `ls`, `cd`, `mkdir`, `cat`, `echo >`, `rm -r` — that's most of day-to-day navigation.
- A clear mental picture: home is `~`, root is `/`, Windows is mounted at `/mnt/c`, and your code is going to live under `~/projects/`.

If anything went sideways — a command did nothing, an error message you didn't expect — copy/paste the exact output to Claude and ask "what does this mean?" That's the workflow from here on.

## Portfolio track

Now that you can navigate WSL, create the folder your portfolio site will live in:

```bash
cd ~
mkdir -p projects/my-tools
cd projects/my-tools
echo "# my-tools" > README.md
ls
cat README.md
```

That's it for today. An empty folder with a README. We'll turn it into a real page in the next lesson.

## What to take away

- WSL gives you a real Linux environment on Windows. No dual-boot, no VM hassle.
- The terminal is where the work happens. Seven commands cover 90% of day-one navigation.
- The filesystem is a tree rooted at `/`. Your home is `~`. Windows drives are bridged under `/mnt/`.
- Keep your projects in your WSL home (`~`). Treat `/mnt/c` as a bridge, not a workspace.
- `code .` is the magic command that connects your terminal world to your editor world.

Next up: VSCode, and why it's the editor that ties this whole stack together.
