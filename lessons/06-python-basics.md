## Why Python

Python is the most-used language in AI, the most-taught language in universities, and one of the most readable languages in existence. If you've ever read pseudocode in a textbook and thought "that looks reasonable" — congratulations, you've basically read Python.

For our stack, Python is the default. Most of the code in our projects is Python: it talks to Claude, processes data, runs little servers, glues APIs together. It's not the only language we touch, but it's the one you'll see most.

The goal of this lesson isn't to make you a Python developer. It's to make sure that when Claude writes Python for you, **you can read it, follow what it's doing, and ask sharp follow-up questions.** That's the skill.

## Hello World

The first program in any language:

```python
print("Hello, world!")
```

Save that as `hello.py`, run `python hello.py` in your terminal, and Python prints it out. That's it. No imports, no boilerplate, no `public static void main(String[] args)`. Python is designed to get out of your way.

## Variables

No type declarations. You just name a thing and assign it:

```python
name = "Ada"
age = 36
is_admin = True
```

Python figures out the type from what you assigned. `name` is a string, `age` is an integer, `is_admin` is a boolean. You can change what's in a variable later, no ceremony.

## Strings and f-strings

Strings go in quotes (single or double, your choice). The most-used Python feature for building strings is the **f-string** — you put `f` in front of the quotes and drop variables in with `{}`:

```python
name = "Ada"
greeting = f"Hi {name}, welcome to GenAI101"
print(greeting)
```

That prints `Hi Ada, welcome to GenAI101`. You'll use f-strings constantly. Get comfortable with them.

## Lists and dicts

A **list** is an ordered collection. Square brackets:

```python
people = ["Ada", "Grace", "Hopper"]
```

A **dict** (dictionary) is key-value pairs. Curly brackets:

```python
ages = {"Ada": 36, "Grace": 12, "Hopper": 41}
```

You get a value out by its key: `ages["Grace"]` gives you `12`. Lists and dicts are the two data structures you'll see in 90% of Python code.

## if / else

Decisions:

```python
if age >= 18:
    print("Adult")
else:
    print("Kid")
```

Notice the colon and the indentation. Python doesn't use curly braces to group code — it uses indentation. The indented lines are "inside" the `if`. We'll come back to this.

## for loops

Doing something for each item in a collection:

```python
for person in people:
    print(f"Hello, {person}")
```

Read it out loud: "for each person in people, print hello." Python loops read like English on purpose.

## Functions

Reusable blocks of code. Defined with `def`:

```python
def greet(name):
    return f"Hello, {name}"

message = greet("Ada")
print(message)
```

`def` says "I'm defining a function." `greet` is its name. `(name)` is what it takes in. `return` is what it gives back. Call it like `greet("Ada")`, get the result back, do whatever with it.

## Indentation is syntax, not decoration

This is the one Python rule that surprises people from other languages. **The indentation is the grouping.** Most languages use `{ }` to mark what's inside an `if` or a function. Python uses whitespace.

```python
def greet(name):
    return f"Hello, {name}"   # indented = inside the function

print("done")                  # not indented = outside the function
```

Use four spaces per level. VSCode handles this for you automatically. Just don't mix tabs and spaces — Python will yell at you.

## A tiny end-to-end snippet

Here's ten lines that read like real code. A function that greets a list of people, but says something different for kids:

```python
def greet_everyone(people, ages):
    for person in people:
        age = ages[person]
        if age < 18:
            print(f"Hey {person}! How's school?")
        else:
            print(f"Hi {person}, good to see you.")

people = ["Ada", "Grace", "Hopper"]
ages = {"Ada": 36, "Grace": 12, "Hopper": 41}
greet_everyone(people, ages)
```

Walk through it: a function takes a list and a dict, loops over the list, looks each person up in the dict, branches on their age, and prints something. That's it. You can read every line. You could ask Claude to add a new feature to it — "also count how many adults there are" — and you'd be able to spot-check what comes back.

> Quick way to remember it: **read Python top to bottom, indent levels tell you what's inside what.**

## Lab: write, run, and have your AI explain a Python script

10 minutes. The goal: prove to yourself you can write Python, run it, and use your AI helper to deepen understanding of what you wrote.

### Step 1 — Write the file

In a WSL terminal:

```bash
cd ~/projects
mkdir -p lab-python
cd lab-python
code .
```

In VSCode, create a new file called `greet.py` and paste in:

```python
def greet_everyone(people, ages):
    for person in people:
        age = ages[person]
        if age < 18:
            print(f"Hey {person}! How's school?")
        else:
            print(f"Hi {person}, good to see you.")

people = ["Ada", "Grace", "Hopper"]
ages = {"Ada": 36, "Grace": 12, "Hopper": 41}
greet_everyone(people, ages)
```

Save it (`Ctrl+S`).

### Step 2 — Run it

In VSCode's integrated terminal:

```bash
python3 greet.py
```

You should see three greetings, with Grace getting the kid version.

### Step 3 — Break it on purpose

Comment out the `ages = {...}` line (put `#` in front of it). Save. Run again. Read the error message — it should mention `NameError: name 'ages' is not defined`. Copy that error.

### Step 4 — Ask your AI helper to walk you through it

Open the helper you picked in [Module 2](lessons/02-ai-as-codev.md). Paste in:

> *"I'm learning Python. Here's a tiny script and the error I got — explain the error in plain English, what caused it, and how to fix it. Don't rewrite the whole script, just point at the line."*
>
> *(paste your script and the error)*

Notice how specific the answer is when you give it the actual code and the actual error. That's a *much* better prompt than "Python NameError what does it mean".

### Step 5 — Ask for a small feature

Now ask:

> *"Add a feature to this script that also prints how many adults vs kids there are at the end. Keep it short. Don't restructure anything that doesn't need to change."*

Read what comes back. Look at every line. Does it match what you'd write? If yes, paste it in and run it. If no, push back: *"Why did you do X instead of Y?"* That's the loop you'll be running constantly from now on.

## What to take away

- Python is readable, dominant in AI, and the default for our stack.
- The basics (variables, f-strings, lists, dicts, if/else, for, def) cover most of what you'll ever read.
- Indentation isn't style. It's syntax. Four spaces, no mixing.
- You don't need to memorize all of Python. You need to be able to **read it, follow it, and ask Claude smart questions about it.** That's the bar.

Next module: putting it all together — how this stack runs an actual project.
