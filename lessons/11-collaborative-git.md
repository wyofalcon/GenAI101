## Git is how teams ship — including a team of one with an AI

Up to now you've been moving fast. Files on your laptop. Edits in your editor. A tool that runs. That's enough to build *something* — it is not enough to **ship** anything, share anything, work with anyone (Claude included), or recover when things go sideways.

The bridge from "I have files" to "we have a project" is **git.**

Git is two things at once, and people learn it badly because they only see one of them at a time:

1. **A time machine for your code.** Every commit is a saved point you can return to. Mess up? Roll back. Forgot what changed last Tuesday? Look at the diff. That's the *version control* half.
2. **A protocol for collaboration.** Branches, pull requests, reviews, merges — that's how two humans (or one human and one AI) can work on the same codebase without trampling each other. That's the half that matters more, and the one this lesson is about.

You're going to learn **the collaborative flow** here, not the encyclopedia of git commands. Encyclopedias are for reference. The flow is for muscle memory. You'll use it every day, on every project, with every teammate — and yes, **Claude counts as a teammate.** Every diff Claude writes goes through this same loop. Skip the loop and you're shipping code you didn't review, on a branch you don't control, into a history you can't read. That's how teams (and solo builders) ship bugs into production and lose work.

## The mental model — five words

These five words are the whole vocabulary you need on day one. Memorize them.

- **Repo** — a project tracked by git. There's one on your laptop (local) and usually one on GitHub (remote). They're copies that talk to each other.
- **Commit** — a saved snapshot of your changes, with a message describing why. Commits are immutable. You make many per day.
- **Branch** — a parallel line of commits. `main` is the trunk. Your feature lives on its own branch off main until it's ready to merge back.
- **Push / pull** — `push` sends your local commits to the remote. `pull` brings the remote's new commits down to your local. That's it.
- **PR (pull request)** — a proposal on GitHub: "here are the commits on my branch, please review and merge them into main." Reviews, comments, CI checks, and the merge button all live on the PR.

Everything else (rebases, cherry-picks, stashes, reflogs) is intermediate. You don't need it to be collaborative-effective today. You need these five.

![A diagram of the collaborative git loop: local repo (commits on a feature branch) connects to a remote repo on GitHub via push/pull; a pull request flows from the feature branch into main after review.](assets/img/collaborative-git.svg)

## The one rule that prevents 90% of disasters

> **Never commit directly to `main`. Always work on a branch. Always merge via a pull request.**

That rule is not bureaucracy. It is the rule that:

- Lets a teammate (or future-you) see what changed and why, in one reviewable chunk.
- Gives CI a chance to run tests before code lands on the trunk everyone else builds on.
- Keeps `main` deployable at all times — so when something is on fire, you can deploy `main` and trust it.
- Lets you abandon a half-baked idea cheaply (delete the branch) instead of having to un-do commits on the trunk.

Even solo, even with Claude as your only collaborator, **branch-then-PR.** The PR is for you. It's where you read the diff, run the tests, sleep on it if you need to, and only then merge.

## The collaborative loop, step by step

This is the flow. Burn it in. Every day, every project, every feature.

```
1. pull         — sync your local main with the remote
2. branch       — make a new branch off main for your work
3. work + commit — small focused commits as you go
4. push         — send your branch up to the remote
5. open PR      — propose merging your branch into main
6. review       — read the diff (yours or a teammate's), discuss, fix
7. merge        — once green and approved, merge to main
8. clean up     — delete the branch, pull main, you're back at step 1
```

Let's walk each step with the commands and the *why* behind it.

### 1. Pull main first, always

```bash
git checkout main
git pull
```

You start every new piece of work from an up-to-date `main`. If you skip this step, you'll branch off stale code, hit conflicts later, and waste an hour reconciling history that didn't need reconciling. Two seconds of `pull` saves an hour of mess.

### 2. Make a branch — and name it like an adult

```bash
git checkout -b feat/dashboard-date-filter
```

A few branch-naming conventions that pay off forever:

- **Prefix by intent.** `feat/`, `fix/`, `chore/`, `docs/`. Anyone glancing at your branch list knows what's there.
- **Short and specific.** `feat/dashboard-date-filter` is good. `feat/stuff` is not. `feat/refactor-everything-in-the-api-layer-finally` is also not.
- **Dashes, not spaces or slashes-within-words.** Tools chew on these later. Be kind to them.

One branch = one focused change. If you find yourself adding three unrelated things to one branch, **stop and split it.** Future-you reviewing the PR will thank present-you.

### 3. Work in small commits

```bash
# edit files...
git status                 # see what's changed
git diff                   # see the actual changes
git add path/to/file       # stage what you want in THIS commit
git commit -m "Add date filter to dashboard top bar"
```

Three things matter here:

**Stage deliberately.** `git add .` is convenient and dangerous — it sweeps up everything in your working directory, including the `.env` you forgot, the random debug script, the screenshot you left in the folder. Add files by name, or use `git add -p` to stage hunks interactively. Be picky about what enters history; history is forever.

**Commit small and often.** A good commit is a single logical change you could describe in one sentence. "Add date filter UI." "Wire up filter to the data layer." "Persist filter selection in localStorage." Three commits, one feature, a reviewable story. Not: "Did a bunch of stuff today" (one commit, 47 files, nobody can review it).

**Write a real message.** The first line is the *what* in 50 chars or less, imperative mood ("Add", "Fix", "Remove" — not "Added"). If the *why* isn't obvious, add a blank line and a paragraph. The diff already shows *what*. Your message should explain *why* — that's what saves the next person reading your code six months from now.

### 4. Push your branch

```bash
git push -u origin feat/dashboard-date-filter
```

The `-u` flag (only needed the first time you push a branch) tells your local branch to "track" the remote — after that, plain `git push` and `git pull` know which remote branch to talk to.

Push early. Push often. A pushed branch is a backup. An unpushed branch is one spilled coffee away from being gone.

### 5. Open a pull request

On GitHub: branch dropdown → "Compare & pull request" → write a real description.

A good PR description has three things:

- **What changed.** In two or three sentences. Not a play-by-play of every commit.
- **Why.** The motivation, the user-visible behavior, the bug being fixed.
- **How to verify.** A short list of what to click/run to know it works. ("Open `/dashboard`, click the date filter, confirm rows older than 30 days disappear.")

Keep PRs **small.** A PR that touches 5 files in focused ways gets read carefully and merged quickly. A PR that touches 60 files gets a rubber-stamp "LGTM" from a reviewer who skimmed it and missed the bug on line 1,400. Small PRs = real reviews = fewer bugs in main.

### 6. Review — including your own PR before anyone else sees it

The first reviewer of every PR is **you.** Before you ask anyone (human or AI) to look, open the diff on GitHub and read it line by line. You'll catch:

- Debug `print()` / `console.log` you forgot to remove.
- A `TODO` that's not actually done.
- A test file you accidentally checked in.
- That `.env` you almost just shipped to the world.

Then ask a teammate (or Claude — `/review`). Take feedback well. The point of a code review is the code, not the coder. If a reviewer is wrong, push back with reasons. If they're right, fix it on the same branch and push — the PR updates automatically. Don't argue for an hour over what would take 90 seconds to change.

### 7. Merge — once it's green and approved

Two boxes have to be checked on every merge:

- **CI is green.** Tests pass, linters pass, build succeeds. If CI is red, fix it before merging. "I'll fix it after" is how `main` rots.
- **At least one approving review.** Even on a solo project, that approver is you-an-hour-later. Sleep on big changes. Re-read the diff in the morning. Then merge.

Use **"Squash and merge"** for feature branches by default — it collapses your branch's commits into one clean commit on main, with the PR title as the message. Cleaner history, easier rollbacks. (Some teams prefer rebase-merge or merge-commits. Whatever your team uses, use it consistently.)

### 8. Clean up

```bash
git checkout main
git pull
git branch -d feat/dashboard-date-filter   # delete the local branch
```

GitHub usually offers a "Delete branch" button after merge — click it. Stale branches accumulate; clean as you go.

You are now back at step 1, on a fresh `main`, ready for the next thing.

## Working with Claude on the loop

Claude can do almost every step of this loop for you — but **only the step.** You still own the decisions and the review.

What Claude is great at:

- **Drafting commit messages.** Stage your changes, run `claude` in the repo, say "write a commit message for what's staged." Better than 90% of human commit messages on the first try.
- **Writing PR descriptions.** Same idea, against the branch diff. Ask for "What / Why / How to verify."
- **Reviewing diffs.** Slash command `/review` opens a proper review of your current branch. Use it before you ask a human.
- **Resolving simple merge conflicts.** "There's a conflict in `dashboard.py`. Here's mine, here's theirs, here's the intent. Pick the right resolution and explain why."
- **Investigating "what changed."** `git log`, `git blame`, "why was this line added?" — Claude is good at these archaeological questions.

What Claude is **not** allowed to do unsupervised:

- **Force-push.** Ever. To anything. Especially `main`.
- **Skip git hooks** (`--no-verify`). Hooks are there to catch real problems before they land. Bypassing them is how a broken commit lands on main.
- **Commit secrets.** If Claude generates a config with a real key in it, that's on you to catch in review.
- **Merge its own PR.** Even if Claude opened it. You merge. You're the last set of eyes.

The mental rule: **let Claude type the commands, but you press the merge button.** It's the same rule as the build loop — Claude does the typing, you do the judging.

## Merge conflicts — they're not scary, they're just a question

A merge conflict happens when two branches changed the same lines and git can't auto-pick. You'll see something like:

```
<<<<<<< HEAD
your version
=======
their version
>>>>>>> origin/main
```

This is not git breaking. This is git **asking you a question:** "you changed line 42 to X, they changed it to Y, which one do I keep?" Nobody but a human (or a human + Claude) can answer that, because the answer depends on what the code is supposed to do.

The fix:

1. Open the file. You'll see the `<<<<<<<` / `=======` / `>>>>>>>` markers.
2. Edit the file so it's the version you actually want. Delete all three marker lines.
3. `git add` the file. Repeat for any other conflicted files.
4. `git commit` (the merge commit will use a default message — usually fine) or `git rebase --continue` if you were rebasing.

If you don't know which version is right, **ask.** Ask the teammate whose code conflicts with yours. Ask Claude to walk through both sides. Don't guess. A conflict resolved wrong is a silent bug that ships.

## The cardinal sins (do not commit these — pun intended)

A short list of things that ruin days, learned the hard way by everyone who's been doing this for a while:

1. **Committing secrets.** API keys, tokens, `.env` files, private SSH keys. If it ends up in git history, **rotate the secret immediately** — even if you delete the file in the next commit, the key is forever in the history (and on GitHub's servers, possibly cached by bots that scan for exactly this). The fix is rotation, not deletion. Prevention: a real `.gitignore` from day one.
2. **Force-pushing shared branches.** `git push --force` rewrites history. If you do it on `main` (or any branch a teammate is also working on), their work disappears or gets corrupted. Only force-push to *your own* feature branches, and only if nobody else has pulled them. If your team wants safer overwrites, use `--force-with-lease` instead.
3. **Working directly on main.** Already covered. Easy rule, big payoff. Branch first, every time.
4. **Giant PRs.** A PR that touches 40 files won't get a real review. Split it.
5. **Skipping the diff read.** "Tests pass, ship it." No. Read the diff. Every line. Especially when Claude wrote it. Tests confirm behavior; the diff confirms *intent* — and the only way to know intent is right is to read it.
6. **Committing on the wrong branch.** Easy to do when you forget to `git checkout`. Always check `git status` (which prints the current branch) before you start typing. If you've already committed to the wrong branch, `git log` to grab the commit hashes, `git reset` to undo, `git checkout` to the right branch, then re-apply (cherry-pick) the commits.

## The `.gitignore` you want on day one

A `.gitignore` is a file in your repo that lists patterns git should never track. Have one from commit zero. A reasonable starting point:

```
# secrets / config
.env
.env.*
*.pem
*.key

# editor
.vscode/
.idea/
*.swp

# language deps / build output
node_modules/
__pycache__/
*.pyc
dist/
build/

# os junk
.DS_Store
Thumbs.db
```

Adjust for your stack. The point is: by the time you `git add .` for the first commit, anything sensitive or generated is already excluded.

## Lab: run the full loop on a real branch

20 minutes. You'll do the whole flow once, end to end, on a real repo, with a real PR.

If you don't have a GitHub project of your own yet, use the `GenAI101` repo (or a fork of it) you cloned in [Module 5](lessons/05-docker-devcontainers.md). You can also `git init` a brand-new repo with a `hello.md` file in 30 seconds and use that.

### Step 1 — Confirm git is wired up

In a WSL terminal:

```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

The `user.name` and `user.email` are what shows up on every commit you make from now on. Use a real name and the email associated with your GitHub account.

### Step 2 — Pull main, branch off

```bash
cd ~/projects/<your-repo>
git checkout main
git pull
git checkout -b chore/add-my-notes
```

You're now on a brand-new branch. `git status` should print `On branch chore/add-my-notes`.

### Step 3 — Make a tiny, focused change

Create or edit a file. Anything small — a `NOTES.md` with your name and date, a typo fix in the README, whatever. Then:

```bash
git status
git diff
git add NOTES.md           # name files explicitly; avoid `git add .` while you're learning
git commit -m "Add personal notes file"
```

Read what `git status` and `git diff` show you each time. That habit alone separates people who control git from people who get controlled by it.

### Step 4 — Push the branch

```bash
git push -u origin chore/add-my-notes
```

GitHub prints a URL in the response — usually a "compare & pull request" link. Open it in your browser.

### Step 5 — Open a PR

Fill in:

- **Title:** match your commit message intent — short, imperative. "Add personal notes file."
- **Body:** three sections. *What changed.* *Why.* *How to verify.* Even on a tiny change, write all three. Get the muscle now.

Open the PR.

### Step 6 — Self-review

Click the **Files changed** tab. Read your own diff line by line. Is there anything you'd flag if a teammate had written it? Fix anything you flag — commit the fix on the same branch, push, watch the PR update.

### Step 7 — Ask Claude to review

In the repo, in Claude Code:

```
/review
```

Read what it flags. Address what's worth addressing. Push back on what isn't (it's not always right). Push any fixes.

### Step 8 — Merge and clean up

Once you're happy: **Squash and merge** on GitHub. Then locally:

```bash
git checkout main
git pull
git branch -d chore/add-my-notes
```

You're back on a clean `main` that includes your change. That's one full loop. Every feature you ever ship will follow this exact shape.

### Step 9 — Bonus: cause and resolve a conflict (5 min, optional but recommended)

This is the move that flips merge conflicts from "scary" to "routine."

1. On `main`, edit a file (say `NOTES.md`), change line 1, commit, push.
2. Make a new branch from the *previous* state: `git checkout -b conflict-demo HEAD~1`. Change line 1 differently, commit, push.
3. Open a PR for `conflict-demo`. GitHub will tell you it conflicts.
4. Pull main into your branch: `git pull origin main` — you'll see the conflict markers.
5. Resolve by editing the file (pick one version, delete the markers), `git add`, `git commit`, `git push`.
6. PR is now mergeable. Merge it.

Conflicts will never spook you again.

## What to take away

- **Git is the collaboration protocol**, not just a backup tool. Even solo, even with Claude as the only teammate, you use it the same way.
- **The five-word vocabulary:** repo, commit, branch, push/pull, PR. That's the entire mental model.
- **The one rule:** never commit to main. Branch, PR, review, merge. Every time.
- **The loop:** pull → branch → commit → push → PR → review → merge → clean up. Run it weekly until it's muscle memory.
- **Claude can type every git command, but you press the merge button.** Read every diff. Always.
- **Common sins to avoid:** committing secrets, force-pushing shared branches, working on main, giant PRs, skipping diff reads.

This is the loop that turns a folder of files into a project, a project into a team's project, and a team's project into something that actually ships. Practice it on small things until it disappears into the background. Then everything else gets easier.
