+++
title = "Playing with the app"
template = "docs/page.html"
sort_by = "weight"
weight = 20
+++

If everything's gone to plan, when you load up [http://localhost:3000/](http://localhost:3000/),
you should see a simple to-do list.

{{ rimage(path="docs/the-frontend/initial-todo.png") }}

At the moment, the page is not interactive.

# Looking through the stack

Behind the scenes, though, it's polling the backend server for the task list once every second.
That's due to this line of code in `App.js` in the frontend app:

```js
const interval = setInterval(fetchAllTasks, 1000)
```

That configures the browser to call `fetchAllTasks` once every second.
The `fetchAllTasks` function looks like this:

```js
const fetchAllTasks = async () => {
    const response = await fetch("/task/")
    const tasks = await response.json()
    setTasks(tasks);
}
```

It's making a `GET` request to the "List Tasks" FastAPI endpoint.
This may be surprising to you,
because this request is actually being made to the *JavaScript* web server,
(because no host and port was provided in the URL).
Somehow it's being forwarded to the FastAPI server.

This proxying behaviour is configured in the `package.json` file for this app:

```json
"proxy": "http://localhost:8000"
```

This reflects many real-world environments where a reverse-proxy will be configured in front of your static webserver
(that will serve your React app)
and your FastAPI endpoints from a single host.

The FastAPI endpoint is configured in `apps/todo/routers.py` in the `backend` app.

```python
@router.get("/", response_description="List all tasks")
async def list_tasks(request: Request):
    return await request.app.mongodb.get_collection("tasks").find().to_list(length=100)
```

This endpoint is making a [find()](https://pymongo.readthedocs.io/en/stable/tutorial.html#querying-for-more-than-one-document) request for all of the documents in the collection,
and then returning it.
FastAPI handles the serialization to JSON, which is then sent to the browser in response to the polling call.

# Modify the database

What does this all mean?
If you can update the database, you can change what you see in the browser.
There are three ways to do this:

1. You can craft the appropriate Rest API call in `curl` or `httpie` or `xh`.
2. You could use the FastAPI interface to craft the appropriate Rest API call.
3. You can go directly to the database and update the records.

Because you're using a cluster in MongoDB Atlas,
you have a nice web-based interface for making queries and updates available to you.

1. Open up a browser tab to your cluster in MongoDB Atlas.
2. Click on "Browse Collections"
3. Select your "farmstack" database, and then your "tasks" collection.
   (If it's not already selected.)

You should see your to-do tasks.
Double click on the value of "completed" and change the value.
Switch back to the frontend app in your browser, and you should see the checkbox for that item change!

# An aside about Websockets and Change Streams

Polling the database isn't actually a very efficient or responsive way to update the frontend interface,
but we were trying to keep the app simple.
It would be much better if we could _listen_ to the collection and receive events _only_ when the data in the collection changes.
MongoDB actually contains this feature!
It's called [Change Streams](https://www.mongodb.com/docs/manual/changeStreams/).
With PyMongo or Motor, you can use the `watch()` method to receive a stream of changes to a collection.

With [starlette](https://www.starlette.io/)
(the web server engine that FastAPI is built on)
it should be relatively straightforward to have a WebSocket or Server-Side Event endpoint
that will push change stream events up to the browser.
Check out [SSE-Starlette](https://github.com/sysid/sse-starlette) for one way to do that.

# What's Next?

You've kind of checked out the current capabilities of the app.
Let's add some new functionality,
starting with the ability to add new tasks to the to-do list.