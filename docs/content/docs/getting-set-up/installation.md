+++
title = "Install Your Dependencies"
template = "docs/page.html"
weight = 30
sort_by = "weight"

[extra]
# lead = "Install Python & NodeJS."
toc = true
+++

## Install Python

Python's the most popular programming language in the World!
It's the tool you'll use to run the backend service, that's written using Python and FastAPI.

If you have a version of Python thats 3.8 or higher, then you should probably use that.

If you don't have a version of Python for development, or if the version is lower than 3.8,
then I recommend installing the most recent version from [Python.org](https://www.python.org/downloads/).
At the time of writing, that's 3.10.

If you already use homebrew, you could run `brew install python@3.10`. It may be the quickest and easiest approach.

There are a few different ways to install Python, and you may already have a preferred way.
If you do (such as [pyenv](https://github.com/pyenv/pyenv#getting-pyenv) or [asdf](https://asdf-vm.com/)), do that!
Pyenv is probably slightly simpler to use,
but asdf does everything that pyenv does, 
_and_ it lets you manage versions of other tools, like nodejs.

Once you've installed Python, if you can open up your favourite console app and type `python` and it shows something like this...

```
Python 3.10.6 (main, Sep  1 2022, 16:56:55) [Clang 13.1.6 (clang-1316.0.21.2.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

... then you're good.

If typing `python` in your console tells you it's an unknown command,
then you'll need to add the location of Python to your environment's PATH variable.
If you don't know how to do this, then ask for help!

## Install NodeJS

For this workshop, you'll need a recent version of nodejs.
At the time of writing, that's [NodeJS v18.9](https://nodejs.org/en/download/current/).

If you prefer, you can install it using the link above.
The simplest approach, if you're already using homebrew,
is probably to run `brew install node`

If you run `node` and you see something like the following, then you're good:

```
Welcome to Node.js v18.8.0.
Type ".help" for more information.
> 
```

If typing `node` in your console tells you it's an unknown command,
then you'll need to add the location of NodeJS to your environment's PATH variable.
If you don't know how to do this, then ask for help!