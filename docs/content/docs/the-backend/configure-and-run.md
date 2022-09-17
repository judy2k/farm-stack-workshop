+++
title = "Configure and run the backend app"
template = "docs/page.html"
weight = 90

[extra]
lead = "Configure and run the back-end FastAPI app."
toc = true
+++

## Configure The App

In order to run, the app need some environment variables to be set.

| Variable      | Description |
| ----------- | ----------- |
| DEBUG_MODE      | Automatically reload your changes when you edit files.       |
| DB_URL | The connection string for your MongoDB database! |
| DB_NAME | The name of your database on the cluster. |

There are a bunch of ways to configure these variables. 
I put mine in a short script, `env.sh` and then I can run it in my shell with `source env.sh`.

```bash
export DEBUG_MODE=True
export DB_URL="mongodb+srv://farm_stack_workshop:SUPERSECRETPASSWORD@sandbox.sqp1k.mongodb.net/?retryWrites=true&w=majority"
export DB_NAME="farmstack"
```

If you're going to use the same approach,
create a file like this,
and then delete the value of the `DB_URL` variable.

It's time to go get your MongoDB connection string!

## Your connection string

Go back to MongoDB Atlas in your browser.
Your cluster should have finished starting up,
and it's now time to get your connection details.

1. Select "Connect your application"
2. Click on "Connect", and then select "Python" in the "Driver" drop-down.
3. The driver version should be the highest number in the drop-down.
4. You should see a URI (which is a MongoDB connection string) in the second step on the page.
   Click on the copy button and paste it into your configuration script.

The connection string you've been given hasn't got a valid user account embedded in it.
Instead, it contains `<username>:<password>`. 
You need to fix that by creating a user account.

## Create a new user

Close the "Connect" panel,
and click "Database Access" in the navigation column on the left-hand side of the page.

1. Click the "Add New Database User" button.
2. Authentication method should be "Password"
3. Type in a username for the user. I used "farm_demo"
4. Click "Autogenerate Secure Password" - it's the quickest way to get a secure password for the account.
5. Copy and paste the username to replace `<username>` in your script.
6. Click the "Copy" button and paste the password to replace `<password>` in your script.

That's great! You have a connection string for your user, but it doesn't actually have enough privileges to connect to your database.

Under "Database User Privileges", click on "Add Built-in Role" and select "Read and Write To Any Database".
You would usually lock down the user in production for security reasons,
but for this situation, this will be fine.

Click the "Add User" button.

**Nearly there!** But not _quite_. By default, your cluster is locked down so it can't be accessed over the network at all. Let's go fix that.

## Network Access

1. Click "Network Access" on the left-hand side (just under "Database Access").
2. Click "Add IP Address" on the right-hand side of the screen.
3. If you know you have a static IP address, you can select "Add My IP Address",
   but if you don't know, select "Allow Access From Anywhere".
   Again, you wouldn't do this in production,
   but it'll be fine for this development project.

**Okay!** Now run `source env.sh` (or whatever you called your config script), and run `echo $DB_NAME` it should print out "farmstack"

## Run The Backend Service

Now run `python main.py` in the "backend" directory to start the service.

If everything's going well, you should see something like this:

```
$ python main.py
INFO:     Will watch for changes in these directories: ['/Users/judy2k/Sync/Talks/FARM-Intro/backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [68282] using WatchFiles
INFO:     Started server process [68284]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Now let's go and explore the backend app,
and see if you can create some data!