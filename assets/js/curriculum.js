/* GenAI101 — curriculum definition
 * Add/edit modules, quizzes, and tests here. Lesson bodies are loaded
 * from the lessons/ directory as markdown.
 *
 * Quiz/test answer formats:
 *   { type: "single", choices: [...], answer: 2 }       // index of correct choice
 *   { type: "multi",  choices: [...], answer: [0, 2] }  // set of correct indices
 *   { type: "tf",     answer: true }                    // true/false shortcut
 *
 * Setup checklist (optional, per-module):
 *   setup: {
 *     title: "Setup checkpoint",
 *     intro: "short markdown paragraph shown above the checklist",
 *     items: [
 *       { id: "wsl-installed", label: "WSL 2 is installed and running Ubuntu",
 *         hint: "Run `wsl --version` in PowerShell — should print a version line." }
 *     ]
 *   }
 * If a module has setup, the lesson's "Take the quiz" button (and any test
 * that covers that module) is gated on every item being checked.
 */

const PASSING_GRADE = 0.8; // 80%

const MODULES = [
  {
    id: "m01-what-is-programming",
    title: "What programming actually is",
    blurb: "Languages, frameworks, libraries — what's the difference, and why does it matter?",
    lesson: "lessons/01-what-is-programming.md",
    quiz: [
      {
        type: "single",
        q: "At its core, what is a 'programming language'?",
        choices: [
          "A spoken language used by engineers at conferences.",
          "A set of rules and words that lets a human give instructions to a computer.",
          "A type of software you install to write apps.",
          "A specific version of an operating system."
        ],
        answer: 1,
        why: "A language is just the grammar + vocabulary you use to tell the computer what to do. Python, JavaScript, and Go are all examples."
      },
      {
        type: "single",
        q: "Which of these is the best description of a 'framework'?",
        choices: [
          "A computer chip that runs code faster.",
          "A pre-built scaffold of code that handles the boring/repetitive parts of building an app, so you can focus on what's unique.",
          "Another word for 'language'.",
          "A type of test that proves your code works."
        ],
        answer: 1,
        why: "Frameworks like React, FastAPI, or Expo give you 80% of an app's plumbing for free. You bring the unique 20%."
      },
      {
        type: "single",
        q: "What's the difference between a library and a framework?",
        choices: [
          "There is no difference, the terms mean the same thing.",
          "A library is older; frameworks are newer.",
          "You call a library when you need it; a framework calls your code (it's in charge of the overall shape).",
          "Libraries are free, frameworks cost money."
        ],
        answer: 2,
        why: "'You call a library; a framework calls you' — frameworks dictate the structure, libraries are tools you reach for."
      },
      {
        type: "tf",
        q: "There is exactly one correct way to build a software product.",
        answer: false,
        why: "There are many valid ways. This curriculum teaches one — ours. Your job is to learn ours well, not to assume it's the only one."
      },
      {
        type: "single",
        q: "Which of these is NOT a programming language?",
        choices: ["Python", "JavaScript", "Docker", "Go"],
        answer: 2,
        why: "Docker is a tool for packaging and running software in containers. It's not a language."
      }
    ]
  },

  {
    id: "m02-ai-as-codev",
    title: "AI as your co-developer",
    blurb: "Who the big AI players are, what each is good at, and which one you'll pick as your everyday helper.",
    lesson: "lessons/02-ai-as-codev.md",
    setup: {
      title: "Setup checkpoint — pick your everyday AI helper",
      intro: "You'll have **two** AI helpers by the end of this curriculum: a coding co-developer (Claude Code, set up later) and an everyday browser/document helper that you pick now. Read the comparison in the lesson, pick one, and get it installed. From this lesson on, you'll be expected to lean on it whenever you're stuck.",
      items: [
        { id: "read-comparison",
          label: "Read the comparison of Claude Desktop, Gemini, ChatGPT, and Copilot in the lesson above",
          hint: "Skim the strengths/weaknesses for each. Pick based on where you already live — Google, Microsoft, or somewhere new." },
        { id: "picked-helper",
          label: "Picked one as my everyday helper (any of: Claude, Gemini, ChatGPT, Copilot)",
          hint: "No wrong answer. You can switch later. The point is to have **one** you reach for by default." },
        { id: "installed-or-bookmarked",
          label: "Installed the desktop/mobile app **or** bookmarked/pinned the browser tab",
          hint: "Claude: claude.ai. Gemini: gemini.google.com. ChatGPT: chatgpt.com. Copilot: copilot.microsoft.com (or built into Windows 11 — try the Copilot key)." },
        { id: "first-prompt",
          label: "Sent a real first prompt and judged the result (summarize a PDF, rewrite an email, explain something)",
          hint: "Don't just say 'hi'. Use it on something you actually need today. Notice whether the output is specific and follows your instructions — that's the muscle." }
      ]
    },
    quiz: [
      {
        type: "single",
        q: "Which company makes Claude?",
        choices: ["OpenAI", "Anthropic", "Google", "Meta"],
        answer: 1,
        why: "Claude is built by Anthropic. ChatGPT is from OpenAI; Gemini is from Google; Llama is from Meta; Copilot is from Microsoft (built on OpenAI + own models)."
      },
      {
        type: "single",
        q: "Why does our team default to Claude for **building software**?",
        choices: [
          "It's the cheapest model on the market.",
          "Its coding behavior, tool-use, and willingness to work in long agentic loops fits how we ship.",
          "It's the only AI that can write Python.",
          "It runs locally on your laptop with no internet."
        ],
        answer: 1,
        why: "Every model can write code. We chose Claude because of how it behaves as a long-running co-developer — careful tool use, good judgment in agentic loops, and strong code edits."
      },
      {
        type: "multi",
        q: "Which of these are real, widely-used AI assistants? (pick all that apply)",
        choices: ["ChatGPT (OpenAI)", "Claude (Anthropic)", "Gemini (Google)", "Copilot (Microsoft)", "BananaScript (FruitCorp)"],
        answer: [0, 1, 2, 3],
        why: "ChatGPT, Claude, Gemini, and Copilot are the four biggest general-purpose assistants you'll meet. BananaScript is made up."
      },
      {
        type: "tf",
        q: "Picking an AI is about strengths and weaknesses — no single model is best at everything.",
        answer: true,
        why: "Different models lead in different things (coding, reasoning, multimodal, cost, speed, ecosystem fit). We picked Claude for coding; Nolan personally uses Gemini for everyday browser tasks. That's normal."
      },
      {
        type: "single",
        q: "Which AI is built natively into Windows, Office, Edge, and Outlook?",
        choices: ["Claude", "Gemini", "Copilot", "Grok"],
        answer: 2,
        why: "Microsoft Copilot is wired into the entire Microsoft ecosystem. If you live in Windows + Office, it's already there."
      },
      {
        type: "single",
        q: "Which everyday helper is the best fit if you mostly live in Gmail, Docs, and Drive?",
        choices: ["Claude Desktop", "Gemini", "ChatGPT", "Copilot"],
        answer: 1,
        why: "Gemini is Google's. It's free with any Google account and sees your Google data if you let it. Nolan uses Gemini as his daily browser helper for exactly these reasons."
      },
      {
        type: "tf",
        q: "It's totally normal to use one AI for coding and a different AI for everyday browser tasks.",
        answer: true,
        why: "That's the recommendation. Use the best tool for each job. Most people end up with two helpers by the end of this course."
      },
      {
        type: "single",
        q: "When Nolan says 'if you can think it, you can build it,' what does he mean?",
        choices: [
          "AI will do all the work for you with zero effort.",
          "With AI as a co-developer, the bottleneck is your imagination + clarity of thought, not the typing.",
          "Coding is easy and anyone can do it in five minutes.",
          "You don't need to learn anything because AI knows everything."
        ],
        answer: 1,
        why: "You still have to think clearly and direct the work. AI removes a huge amount of the 'typing the syntax' friction so ideas can become real fast."
      }
    ]
  },

  {
    id: "m03-wsl-and-terminal",
    title: "WSL and the terminal",
    blurb: "Why we run Linux inside Windows, and the handful of terminal commands you'll actually use.",
    lesson: "lessons/03-wsl-and-terminal.md",
    setup: {
      title: "Setup checkpoint — WSL",
      intro: "Before you can take the quiz, get WSL installed. We're on the honor system — but you'll need it to do anything in the next lessons, so do it now. Need help? Ask Claude (or Google) the install error you hit; this is exactly the kind of thing AI is great for.",
      items: [
        { id: "wsl-installed",
          label: "WSL 2 is installed",
          hint: "Open PowerShell as admin and run `wsl --install`. Reboot if it asks. Confirm with `wsl --version`." },
        { id: "ubuntu-running",
          label: "Ubuntu (or another Linux distro) launches when I type `wsl` in a terminal",
          hint: "First launch will ask you to set a Linux username + password. Pick something you'll remember." },
        { id: "wsl-home",
          label: "I can `cd ~` and `ls` from inside WSL without errors",
          hint: "Open a WSL terminal, run those two commands. You should see your Linux home directory contents (probably empty)." }
      ]
    },
    quiz: [
      {
        type: "single",
        q: "What does WSL stand for?",
        choices: [
          "Windows Software Library",
          "Windows Subsystem for Linux",
          "Web Server Local",
          "Windows System Loader"
        ],
        answer: 1,
        why: "Windows Subsystem for Linux. It lets you run a real Linux environment inside Windows."
      },
      {
        type: "single",
        q: "Why do we use WSL instead of just developing on Windows directly?",
        choices: [
          "Linux is required by law for developers.",
          "Most servers, devcontainers, and open-source tools assume a Linux environment — WSL gives you that without leaving Windows.",
          "WSL makes your computer faster overall.",
          "Windows can't run any code at all."
        ],
        answer: 1,
        why: "Production servers and most modern tooling are built for Linux. WSL gives you a real Linux dev environment without rebooting or dual-booting."
      },
      {
        type: "single",
        q: "Which terminal command lists files in the current folder?",
        choices: ["pwd", "cd", "ls", "echo"],
        answer: 2,
        why: "`ls` lists. `pwd` prints working directory. `cd` changes directory. `echo` prints text."
      },
      {
        type: "single",
        q: "You're in `/home/you` and want to move into a folder called `projects`. What do you type?",
        choices: ["cd projects", "ls projects", "mv projects", "open projects"],
        answer: 0,
        why: "`cd projects` — 'change directory'. Then `ls` to see what's inside, `pwd` to confirm where you are."
      },
      {
        type: "tf",
        q: "Files saved in your WSL home folder are stored separately from your Windows C: drive.",
        answer: true,
        why: "WSL has its own Linux filesystem. You can reach Windows files from WSL via `/mnt/c/...`, but your WSL home (`~`) is a separate world."
      }
    ]
  },

  {
    id: "m04-ide-and-vscode",
    title: "VSCode — your editor",
    blurb: "What an IDE is, why VSCode, and the extensions worth installing day one.",
    lesson: "lessons/04-ide-and-vscode.md",
    setup: {
      title: "Setup checkpoint — VSCode + extensions",
      intro: "Install VSCode on Windows (not inside WSL — VSCode lives on the Windows side, but it'll connect into WSL for you). Then install the extensions below from VSCode's Extensions panel.",
      items: [
        { id: "vscode-installed",
          label: "VSCode is installed and opens",
          hint: "Download from code.visualstudio.com. Install on Windows itself." },
        { id: "ext-wsl",
          label: "Installed the **WSL** extension (Microsoft)",
          hint: "Extensions panel → search 'WSL' → publisher: Microsoft → Install." },
        { id: "ext-devcontainers",
          label: "Installed the **Dev Containers** extension (Microsoft)",
          hint: "Same panel — search 'Dev Containers' → Install." },
        { id: "code-from-wsl",
          label: "I can run `code .` from inside a WSL terminal and VSCode opens with a green WSL indicator in the bottom-left",
          hint: "Open WSL, `cd ~`, `mkdir test && cd test`, `code .`. VSCode should open. Bottom-left status bar should say something like 'WSL: Ubuntu'." }
      ]
    },
    quiz: [
      {
        type: "single",
        q: "What does IDE stand for?",
        choices: [
          "Internal Developer Engine",
          "Integrated Development Environment",
          "Internet Desktop Editor",
          "Interactive Debugging Editor"
        ],
        answer: 1,
        why: "Integrated Development Environment — your editor, file browser, terminal, debugger, and extensions all in one window."
      },
      {
        type: "single",
        q: "Which editor will we be using throughout this course?",
        choices: ["Notepad", "VSCode", "Microsoft Word", "Xcode"],
        answer: 1,
        why: "VSCode (Visual Studio Code). Free, fast, huge extension ecosystem, great WSL and devcontainer support."
      },
      {
        type: "single",
        q: "Why does VSCode work especially well with our setup (WSL + devcontainers)?",
        choices: [
          "It is the only editor that runs on Windows.",
          "It has first-class extensions for 'WSL' and 'Dev Containers' that let you edit code as if it lived locally even when it runs inside Linux or a container.",
          "It is the only editor that supports Python.",
          "It comes pre-installed on every computer."
        ],
        answer: 1,
        why: "Microsoft built official WSL and Dev Containers extensions for VSCode — that combo is a big reason we use it."
      },
      {
        type: "tf",
        q: "An IDE is just a fancier text editor.",
        answer: false,
        why: "An IDE adds debugging, language tooling, extensions, integrated terminal, version control, and more. It's a whole workshop."
      }
    ]
  },

  {
    id: "m05-docker-devcontainers",
    title: "Docker & devcontainers",
    blurb: "What containers are, why we use them, and what a `.devcontainer/` folder buys you.",
    lesson: "lessons/05-docker-devcontainers.md",
    setup: {
      title: "Setup checkpoint — Docker",
      intro: "Install Docker Desktop on Windows and make sure it talks to WSL. You don't need to *open* a devcontainer yet — that comes when you start working on a project — but Docker has to be installed and running.",
      items: [
        { id: "docker-installed",
          label: "Docker Desktop is installed",
          hint: "Download from docker.com/products/docker-desktop. Install on Windows." },
        { id: "docker-wsl-backend",
          label: "Docker Desktop is set to use the **WSL 2 backend**",
          hint: "Docker Desktop → Settings → General → 'Use WSL 2 based engine' is checked. Settings → Resources → WSL Integration → enable for your Ubuntu distro." },
        { id: "docker-runs",
          label: "I can run `docker --version` from a WSL terminal and it prints a version",
          hint: "If it errors, Docker Desktop probably isn't running or WSL integration isn't enabled. Restart Docker Desktop and re-check." }
      ]
    },
    quiz: [
      {
        type: "single",
        q: "What problem do containers (Docker) solve?",
        choices: [
          "They make your computer's hard drive bigger.",
          "They package an app together with its exact environment so it runs the same on every machine.",
          "They translate code into other languages.",
          "They speed up your internet connection."
        ],
        answer: 1,
        why: "The 'it works on my machine' problem. Containers freeze the OS, language version, libraries, and config so everyone gets the same result."
      },
      {
        type: "single",
        q: "What is a 'devcontainer'?",
        choices: [
          "A container designed for the developer's machine — defining the exact tools, language versions, and extensions needed to work on a project.",
          "A type of physical shipping container used by tech companies.",
          "Another name for a virtual machine.",
          "A Linux distribution."
        ],
        answer: 0,
        why: "A devcontainer is a container set up specifically for development. Clone the repo, open it in VSCode, and your environment is instantly the same as everyone else's."
      },
      {
        type: "single",
        q: "Where does a project's devcontainer config live?",
        choices: [
          "In a folder called `.devcontainer/`",
          "In a folder called `node_modules/`",
          "In a file called `README.md`",
          "Anywhere — it doesn't matter."
        ],
        answer: 0,
        why: "VSCode + Dev Containers extension looks for a `.devcontainer/devcontainer.json` (or in `.devcontainer/devcontainer.json`)."
      },
      {
        type: "tf",
        q: "If your devcontainer is set up correctly, a new teammate can clone the repo and start working in minutes, even on a different OS.",
        answer: true,
        why: "That's exactly the point. The container carries the environment so the human doesn't have to install 14 things by hand."
      }
    ]
  },

  {
    id: "m06-python-basics",
    title: "Python — just enough to be dangerous",
    blurb: "Hello world, variables, functions, and reading code without flinching.",
    lesson: "lessons/06-python-basics.md",
    quiz: [
      {
        type: "single",
        q: "How do you print 'Hello, world!' in Python?",
        choices: [
          "echo 'Hello, world!'",
          "console.log('Hello, world!')",
          "print('Hello, world!')",
          "System.out.println('Hello, world!')"
        ],
        answer: 2,
        why: "`print(...)` in Python. `console.log` is JavaScript, `echo` is shell, `System.out.println` is Java."
      },
      {
        type: "single",
        q: "Which line correctly stores the number 7 in a variable called `age`?",
        choices: [
          "age == 7",
          "age = 7",
          "let age = 7",
          "int age = 7"
        ],
        answer: 1,
        why: "Python is simple: `age = 7`. No keyword, no type declaration. `==` is comparison, not assignment."
      },
      {
        type: "single",
        q: "What does this code print?\n\n```python\nname = 'Ada'\nprint(f'Hi {name}')\n```",
        choices: ["Hi name", "Hi {name}", "Hi Ada", "It errors"],
        answer: 2,
        why: "An f-string substitutes the value of `name` into the string. Output: `Hi Ada`."
      },
      {
        type: "single",
        q: "How do you define a function called `greet` that takes one argument `name`?",
        choices: [
          "function greet(name) { ... }",
          "def greet(name):",
          "func greet(name):",
          "greet = function(name) -> ..."
        ],
        answer: 1,
        why: "Python uses `def`. The colon and indentation that follow define the function body."
      },
      {
        type: "tf",
        q: "Indentation (spaces at the start of a line) is just for looks in Python.",
        answer: false,
        why: "In Python, indentation is part of the syntax. It defines what's inside a function, loop, or if-block. Get it wrong and the code won't run."
      }
    ]
  },

  {
    id: "m07-how-nolan-builds",
    title: "How we actually build (the workflow)",
    blurb: "The mindset, the loop, and how to talk to Claude so it actually helps.",
    lesson: "lessons/07-how-nolan-builds.md",
    quiz: [
      {
        type: "single",
        q: "What's the first thing to do before writing (or asking Claude to write) any code for a new feature?",
        choices: [
          "Start typing as fast as possible.",
          "Get clear on what you're trying to build and why — the clearer the goal, the better the AI's output.",
          "Open six new tabs.",
          "Pick a color scheme."
        ],
        answer: 1,
        why: "Claude is a force multiplier on your thinking. Fuzzy input → fuzzy output. Clear goal → useful code."
      },
      {
        type: "tf",
        q: "You should commit and review code that Claude writes the same way you'd review code a human teammate wrote.",
        answer: true,
        why: "AI is a co-developer, not a magic oracle. Read what it writes, test it, and push back when it's wrong."
      },
      {
        type: "single",
        q: "When Claude does something wrong or wanders off track, what's the right move?",
        choices: [
          "Throw your computer out the window.",
          "Tell it what was wrong, give the missing context, and steer it back — short corrective feedback works better than starting from scratch.",
          "Accept the broken code and move on.",
          "Switch to a different AI immediately and never come back."
        ],
        answer: 1,
        why: "Treat Claude like a smart teammate who just walked into the room. Give corrections + missing context; don't restart the whole conversation."
      },
      {
        type: "single",
        q: "In Nolan's workflow, what's the single biggest accelerator?",
        choices: [
          "Buying the most expensive laptop.",
          "Skipping planning so you can code faster.",
          "Tight loops: think, prompt, run, look at the result, correct, repeat.",
          "Writing every line by hand without help."
        ],
        answer: 2,
        why: "Fast feedback loops are the multiplier. Small steps, real results between each, course-correct constantly."
      }
    ]
  },

  {
    id: "m08-mcps-and-addons",
    title: "MCPs, extensions, and addons",
    blurb: "How to extend Claude's reach so it can act in your real tools, not just type in a chat box.",
    lesson: "lessons/08-mcps-and-addons.md",
    setup: {
      title: "Setup checkpoint — Claude Code",
      intro: "Time to install Claude Code itself — the CLI we use as the AI co-developer. You'll use it for everything from here on, so don't skip this.",
      items: [
        { id: "claude-installed",
          label: "Claude Code CLI is installed",
          hint: "Follow the install instructions at claude.com/code (or run `npm install -g @anthropic-ai/claude-code`). Confirm with `claude --version` in WSL." },
        { id: "claude-logged-in",
          label: "I've logged into Claude Code (`claude` opens and works)",
          hint: "Run `claude` in any directory. First time it'll walk you through login. If you don't have an Anthropic account yet, sign up at claude.com first, or ask Nolan for access." },
        { id: "claude-init",
          label: "I know how to run `/init` inside Claude Code to generate a `CLAUDE.md`",
          hint: "Open `claude` in a project directory. Type `/init` and hit enter. It scans the repo and drafts a CLAUDE.md for you. We'll go deep on this next lesson." }
      ]
    },
    quiz: [
      {
        type: "single",
        q: "What does MCP stand for in the AI world?",
        choices: [
          "Multi-Channel Processor",
          "Model Context Protocol",
          "Managed Code Pipeline",
          "Machine-Controlled Plugin"
        ],
        answer: 1,
        why: "Model Context Protocol. A standard way for an AI model to talk to external tools and data sources."
      },
      {
        type: "single",
        q: "Why are MCPs a big deal?",
        choices: [
          "They make Claude faster at typing.",
          "They let Claude actually use other systems (your filesystem, GitHub, a database, design tools) instead of just chatting about them.",
          "They make Claude work offline.",
          "They are required to install Claude."
        ],
        answer: 1,
        why: "MCPs turn Claude from a 'chat about stuff' assistant into a 'do stuff in your tools' co-developer."
      },
      {
        type: "tf",
        q: "Skills, slash commands, and extensions are all ways to add capability to Claude Code beyond what it ships with by default.",
        answer: true,
        why: "Skills add domain expertise (like Nolan's own 'daemonstrate' for codebase diagrams), slash commands automate workflows, and extensions/plugins expose new tools."
      },
      {
        type: "single",
        q: "Nolan built a Claude Code skill called 'Daemonstrate'. What does it do?",
        choices: [
          "It removes demons from your computer.",
          "It generates draw.io architecture diagrams of a codebase with paired technical / plain-English views.",
          "It writes unit tests.",
          "It speeds up your internet."
        ],
        answer: 1,
        why: "Daemonstrate turns codebases into paired Technical / Plain-English .drawio diagrams. Real example of extending Claude to do something specific to how he builds."
      }
    ]
  },

  {
    id: "m09-using-ai-well",
    title: "Using AI well",
    blurb: "AI as your search engine, finding tools you didn't know existed, choosing the shortest path, and configuring Claude with CLAUDE.md so you stop re-explaining yourself.",
    lesson: "lessons/09-using-ai-well.md",
    quiz: [
      {
        type: "single",
        q: "What's the first habit shift this lesson asks you to make?",
        choices: [
          "Stop using AI for code questions — Google is more reliable.",
          "When you have a question, ask Claude before you reach for Google.",
          "Only ask Claude questions in the morning, when it's freshest.",
          "Never ask the same question twice."
        ],
        answer: 1,
        why: "AI has read everything Google has — plus your code. Ask it first; verify against primary sources when it matters."
      },
      {
        type: "single",
        q: "Why is 'periodically ask if there's a better way' such a high-leverage habit?",
        choices: [
          "Because Claude gets bored if you don't.",
          "Because you can't ask for tools, libraries, or patterns you don't know exist — five seconds of asking can save a week of rebuilding something that already exists.",
          "Because it makes the AI faster.",
          "Because every project needs at least one library swap."
        ],
        answer: 1,
        why: "The biggest accelerator after the build loop is discovering the right tool before you start. Five-second check, massive payoff."
      },
      {
        type: "tf",
        q: "Two different implementations of the same feature can differ by 10× in code size and ongoing maintenance, depending on which tools and patterns you reach for.",
        answer: true,
        why: "Importing the right library vs. hand-rolling. Three lines of YAML vs. a custom script. Same destination, very different costs."
      },
      {
        type: "single",
        q: "What is `CLAUDE.md` and why does it matter?",
        choices: [
          "It's a license file required to use Claude legally.",
          "It's a file in your repo that Claude Code reads at session start — you put your project's stack, conventions, commands, and 'don't do this' rules in it so Claude knows them every session without you re-explaining.",
          "It's the changelog for new Claude models.",
          "It's a test file Claude writes for you."
        ],
        answer: 1,
        why: "Persistent instructions. Write it once (or run `/init` to draft it), edit as you go, and Claude shows up to every session already knowing your project."
      },
      {
        type: "single",
        q: "Before building something that feels like a lot of work, what's the move?",
        choices: [
          "Power through — discipline matters most.",
          "Ask Claude for 2–3 different ways to solve it with tradeoffs, then pick on purpose.",
          "Always copy the first solution from Stack Overflow.",
          "Skip planning entirely and refactor later."
        ],
        answer: 1,
        why: "'I asked, considered alternatives, chose this on purpose' beats 'I built whatever was suggested first.'"
      }
    ]
  },

  {
    id: "m10-build-your-first-tool",
    title: "Build your first tool",
    blurb: "Pick a real, small project. Ship it. Become useful.",
    lesson: "lessons/10-build-your-first-tool.md",
    quiz: [
      {
        type: "single",
        q: "Which is the better first build?",
        choices: [
          "A full-scale clone of YouTube.",
          "A tiny, useful tool you'll actually use — even if it's 50 lines of code.",
          "Nothing — you should read books for six months first.",
          "Whatever takes the longest, to look impressive."
        ],
        answer: 1,
        why: "Small + shipped + used > big + half-done + unused. Always."
      },
      {
        type: "tf",
        q: "It's okay to ask Claude to scaffold the whole first version of your tool, as long as you read and understand what it produces.",
        answer: true,
        why: "Scaffolding is one of Claude's strongest moves. Just don't ship code you didn't read."
      },
      {
        type: "single",
        q: "After your tool runs end-to-end, what's the most useful next step?",
        choices: [
          "Delete it.",
          "Actually use it on a real task and notice every place it's awkward — those are your next improvements.",
          "Add 40 features before anyone tries it.",
          "Hide it so no one judges it."
        ],
        answer: 1,
        why: "Use → notice friction → fix. That loop turns a toy into a tool."
      },
      {
        type: "single",
        q: "What's the single most important habit Nolan wants you to take from this curriculum?",
        choices: [
          "Memorize all of Python's syntax.",
          "Think clearly about what you want, then partner with Claude tightly — small steps, real feedback, ship.",
          "Avoid asking questions.",
          "Always work alone."
        ],
        answer: 1,
        why: "Clear thinking + tight loops with Claude + actually shipping. That's the whole game."
      }
    ]
  }
];

const TESTS = [
  {
    id: "test-1-foundations",
    title: "Test 1 — Foundations & AI",
    blurb: "Covers Modules 1–2. Pass this in under 8 minutes (with ≥80%) to skip both modules.",
    covers: ["m01-what-is-programming", "m02-ai-as-codev"],
    timeLimitSec: 8 * 60,
    questions: [
      { type: "single", q: "Which best describes a 'framework'?",
        choices: ["A type of chip","Pre-built scaffolding that handles the boring parts so you focus on what's unique","A spoken language","A version of an OS"],
        answer: 1 },
      { type: "single", q: "Which is NOT a programming language?",
        choices: ["Python","Docker","JavaScript","Go"], answer: 1 },
      { type: "tf",     q: "There is only one correct way to build software.", answer: false },
      { type: "single", q: "Who makes Claude?",
        choices: ["OpenAI","Anthropic","Google","Meta"], answer: 1 },
      { type: "multi",  q: "Which of these are real, widely-used AI assistants?",
        choices: ["ChatGPT","Claude","Gemini","Copilot","BananaScript"], answer: [0,1,2,3] },
      { type: "single", q: "Why did our team pick Claude as our default coding co-developer?",
        choices: ["It's the cheapest","Its coding behavior + tool use fits how we ship","It's the only one that writes Python","It runs offline"],
        answer: 1 },
      { type: "single", q: "Which AI is built natively into Windows, Office, and Edge?",
        choices: ["Claude","Gemini","Copilot","Grok"], answer: 2 },
      { type: "tf",     q: "It's normal to use one AI for coding and a different AI for everyday browser tasks.", answer: true },
      { type: "tf",     q: "Different AI models have different strengths — none is best at everything.", answer: true },
      { type: "single", q: "What does Nolan mean by 'if you can think it, you can build it'?",
        choices: ["AI does it all with no effort","With AI as co-developer, your clarity of thought is the bottleneck, not the typing","Coding is trivial","You don't need to learn anything"],
        answer: 1 },
      { type: "single", q: "Which best describes the difference between a library and a framework?",
        choices: ["No difference","You call a library; a framework calls you","Libraries are free, frameworks cost money","Libraries are older"],
        answer: 1 }
    ]
  },

  {
    id: "test-2-environment",
    title: "Test 2 — Your dev environment",
    blurb: "Covers Modules 3–6 (WSL, VSCode, Docker/devcontainers, Python). Pass in under 12 minutes to skip them.",
    covers: ["m03-wsl-and-terminal", "m04-ide-and-vscode", "m05-docker-devcontainers", "m06-python-basics"],
    timeLimitSec: 12 * 60,
    questions: [
      { type: "single", q: "What does WSL stand for?",
        choices: ["Windows Software Library","Windows Subsystem for Linux","Web Server Local","Windows System Loader"],
        answer: 1 },
      { type: "single", q: "Why do we use WSL?",
        choices: ["It makes Windows faster","Most servers and dev tools assume Linux — WSL gives us a real Linux env inside Windows","Required by law","Windows can't run code"],
        answer: 1 },
      { type: "single", q: "Which command lists files?",
        choices: ["pwd","cd","ls","echo"], answer: 2 },
      { type: "single", q: "What does IDE stand for?",
        choices: ["Integrated Development Environment","Internal Developer Engine","Interactive Debug Editor","Internet Desktop Editor"],
        answer: 0 },
      { type: "single", q: "Which editor do we use?",
        choices: ["Notepad","VSCode","Word","Xcode"], answer: 1 },
      { type: "single", q: "What problem do containers (Docker) solve?",
        choices: ["Bigger hard drives","'It works on my machine' — they package the env with the app","Faster internet","Translating code"],
        answer: 1 },
      { type: "single", q: "What's a devcontainer?",
        choices: ["A physical shipping container","A container set up specifically for development — VSCode opens it and you have the full env","A VM","A Linux distro"],
        answer: 1 },
      { type: "single", q: "How do you print Hello world in Python?",
        choices: ["echo 'Hello world'","console.log('Hello world')","print('Hello world')","System.out.println('Hello world')"],
        answer: 2 },
      { type: "single", q: "How do you store the number 7 in a variable called age?",
        choices: ["age == 7","age = 7","let age = 7","int age = 7"], answer: 1 },
      { type: "single", q: "How do you define a function in Python?",
        choices: ["function greet(name) { }","def greet(name):","func greet(name):","greet = fn(name)"],
        answer: 1 },
      { type: "tf", q: "Indentation matters in Python — it's part of the syntax.", answer: true },
      { type: "tf", q: "Your WSL home folder is the same place as your Windows C: drive.", answer: false }
    ]
  },

  {
    id: "test-3-building",
    title: "Test 3 — How we build",
    blurb: "Covers Modules 7–10 (workflow, MCPs/addons, using AI well, build your first tool). Pass in under 12 minutes to skip them.",
    covers: ["m07-how-nolan-builds", "m08-mcps-and-addons", "m09-using-ai-well", "m10-build-your-first-tool"],
    timeLimitSec: 12 * 60,
    questions: [
      { type: "single", q: "Before writing code for a new feature, what comes first?",
        choices: ["Start typing as fast as possible","Get clear on what you're building and why","Open six tabs","Pick a color scheme"],
        answer: 1 },
      { type: "tf", q: "Code Claude writes should get the same review you'd give a human teammate.", answer: true },
      { type: "single", q: "When Claude wanders off track, what's the move?",
        choices: ["Yell","Give corrective feedback + missing context and steer it back","Accept it and move on","Switch AIs forever"],
        answer: 1 },
      { type: "single", q: "What's the biggest accelerator in this workflow?",
        choices: ["Expensive laptop","Tight loops: think → prompt → run → look → correct → repeat","Writing every line by hand","Skipping planning"],
        answer: 1 },
      { type: "single", q: "What does MCP stand for?",
        choices: ["Multi-Channel Processor","Model Context Protocol","Managed Code Pipeline","Machine-Controlled Plugin"],
        answer: 1 },
      { type: "single", q: "Why do MCPs matter?",
        choices: ["Faster typing","They let Claude actually USE external tools/data instead of just chatting about them","They make Claude offline","They're required to install Claude"],
        answer: 1 },
      { type: "single", q: "Nolan's 'Daemonstrate' skill does what?",
        choices: ["Removes demons","Generates draw.io architecture diagrams with paired Technical / Plain-English views","Writes unit tests","Boosts internet speed"],
        answer: 1 },
      { type: "single", q: "What is `CLAUDE.md`?",
        choices: ["A license file","A file Claude reads at every session start so you don't have to re-explain your project's stack and conventions","A test report","A model changelog"],
        answer: 1 },
      { type: "single", q: "Before building something that feels like a lot of work, the move is to:",
        choices: ["Power through","Ask Claude for 2–3 different approaches with tradeoffs, then pick on purpose","Always reuse old code","Skip planning"],
        answer: 1 },
      { type: "single", q: "Which is the better first build?",
        choices: ["A YouTube clone","A small tool you'll actually use","Nothing — read books for six months","Whatever takes the longest"],
        answer: 1 },
      { type: "tf", q: "Asking Claude to scaffold v1 of your tool is fine — as long as you read what it produces.", answer: true },
      { type: "single", q: "The single biggest habit to take from this curriculum:",
        choices: ["Memorize Python syntax","Think clearly + partner tightly with Claude + small steps + ship","Avoid questions","Always work alone"],
        answer: 1 }
    ]
  },

  {
    id: "test-final-challenge",
    title: "Final challenge — put it together",
    blurb: "Harder, cross-cutting questions. Unlocks once you've completed (or tested out of) every module. Pass ≥ 80% in 15 minutes.",
    covers: [],                              // doesn't skip anything — it's a capstone
    finalChallenge: true,                    // only available after everything else is done
    timeLimitSec: 15 * 60,
    questions: [
      { type: "single", q: "You're starting a new project and have 30 minutes before you write any code. Which use of that time is highest-leverage?",
        choices: [
          "Pick a color scheme and a logo.",
          "Set up your `CLAUDE.md` with the stack, conventions, and 'don't do this' rules, AND ask Claude for 2–3 ways to shape the project with tradeoffs.",
          "Memorize Python's standard library.",
          "Hand-type the boilerplate so it 'sticks.'"
        ],
        answer: 1 },
      { type: "multi", q: "Which of these are good signals that you should stop and ask Claude 'is there a better way?' (pick all that apply)",
        choices: [
          "You're about to write 200+ lines of custom code for a problem that feels common.",
          "You've copy-pasted the same fix more than twice.",
          "Something feels surprisingly tedious for what you're trying to do.",
          "You're rage-typing because Claude wandered off."
        ],
        answer: [0,1,2] },
      { type: "single", q: "You're inside a WSL terminal, your project is in `~/projects/foo`, and you want to open it in VSCode with the WSL backend active. What do you type?",
        choices: ["start vscode foo","code .","vscode .","open ./foo"],
        answer: 1 },
      { type: "single", q: "Claude writes a function. It passes the one test you asked it to write, but you haven't read it carefully. What's the right call?",
        choices: [
          "Ship it — the tests pass.",
          "Read it the same way you'd read a teammate's PR before merging, even though tests pass.",
          "Delete it and write it yourself by hand.",
          "Ask Claude to also write the docs, then ship."
        ],
        answer: 1 },
      { type: "single", q: "A teammate joins the project. They clone the repo. With a good devcontainer setup, what should happen next?",
        choices: [
          "They spend a day installing Python, Node, Docker, libraries, etc.",
          "They open the folder in VSCode, click 'Reopen in Container,' and have the same dev environment as everyone else in minutes.",
          "They have to read a 40-page setup wiki.",
          "They use a different OS so 'it works on their machine' for sure."
        ],
        answer: 1 },
      { type: "tf", q: "If your `CLAUDE.md` says 'use httpx, not requests' and Claude still reaches for requests, that's normal — you have to remind it in chat every time.",
        answer: false },
      { type: "single", q: "You hit an obscure error message in a library you've never used. Where do you go first?",
        choices: [
          "Google, then merge three Stack Overflow tabs in your head.",
          "Ask Claude — paste the error and the surrounding code; it answers in terms of your actual project.",
          "Open a GitHub issue immediately.",
          "Rewrite the function from scratch in a different language."
        ],
        answer: 1 },
      { type: "single", q: "Pick the better day-one habit:",
        choices: [
          "Plan a v1 with 12 features, then start building.",
          "Pick the smallest version that's useful to you, ship it end-to-end, then use it and let the friction tell you what to fix.",
          "Wait until you've memorized the whole stack before writing any code.",
          "Build silently in private until it's perfect."
        ],
        answer: 1 },
      { type: "multi", q: "Which of these are ways to extend or configure Claude Code beyond defaults? (pick all that apply)",
        choices: ["MCPs (external tools)","Skills (domain workflows)","CLAUDE.md (project memory)","Slash commands"],
        answer: [0,1,2,3] },
      { type: "single", q: "You ask Claude to add a feature and it produces 400 lines of custom code. You suspect there's a library for it. What's the move?",
        choices: [
          "Accept the 400 lines and move on.",
          "Ask Claude: 'Is there a standard library or pattern for this? What's the smallest version that uses an existing tool?' Then decide.",
          "Delete everything and start over without help.",
          "Push it to main without reading."
        ],
        answer: 1 },
      { type: "tf", q: "WSL files in `~` and Windows files in `/mnt/c` are interchangeable — performance and tool behavior are the same.",
        answer: false },
      { type: "single", q: "What's the single most important thing this curriculum is trying to leave you with?",
        choices: [
          "An encyclopedic memory of Python syntax.",
          "Clear thinking + tight loops with Claude + actually shipping small useful things.",
          "An aversion to ever asking for help.",
          "The exact same opinions as everyone else."
        ],
        answer: 1 }
    ]
  }
];
