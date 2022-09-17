+++
title = "Installing backend dependencies"
template = "docs/page.html"
weight = 80

[extra]
# lead = "Install the Python project dependencies."
toc = true
+++

# Create a Virtualenv (venv) in the directory

```bash
cd backend
python -m venv venv
source venv/bin/activate.sh
```

# Install Your Dependencies

```bash
python -m pip install -r requirements.txt
```

This should install all the dependencies for running the backend.
Now go configure it!