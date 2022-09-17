+++
title = "Install and run the React app"
template = "docs/page.html"
sort_by = "weight"
weight = 10

[extra]
lead = "Install the JavaScript project dependencies and run the app."
toc = true
+++

You will want to run the frontend app and the backend app *at the same time* during development.
Because of this, I recommend running all the commands below in a **separate** console window or tab.

# Install NodeJS dependencies

Because NodeJS installs dependencies locally by default,
you don't need to create a virtualenv.
CD into the `frontend` directory, and run:

```bash
npm install
```

If everything installs okay, then run:

```bash
npm start
```

A browser window should pop up.
(If you're on a Mac, it's possible you may have to agree to allow this first.)
If you switch back to the console, hopefully it has printed something like this:

```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.184.1.95:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

If you switch back to the browser window, you can have a look at the app.