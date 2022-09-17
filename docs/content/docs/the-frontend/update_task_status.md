+++
title = "Sending updates to the server"
template = "docs/page.html"
sort_by = "weight"
weight = 30

[extra]
# lead = "Install Python & NodeJS."
toc = true
+++

Now I'll show you how to handle checkbox events,
compile an update model, 
and explain what happens in the database when FastAPI receives the request.

# How will FastAPI handle the updates?

Let's start by looking at what the FastAPI route is expecting from the client.

I've already implemented the FastAPI update method for you.
It's in `backend/apps/todo/routers.py`,
and it looks like this:

```python
@router.put("/{id}", response_description="Update a task")
async def update_task(id: str, request: Request, task: UpdateTaskModel = Body(...)):
    task = {k: v for k, v in task.dict().items() if v is not None}

    if len(task) >= 1:
        update_result = await request.app.mongodb.get_collection("tasks").update_one(
            {"_id": id}, {"$set": task}
        )

        if update_result.modified_count == 1:
            if (
                updated_task := await request.app.mongodb.get_collection(
                    "tasks"
                ).find_one({"_id": id})
            ) is not None:
                return updated_task

    if (
        existing_task := await request.app.mongodb.get_collection("tasks").find_one(
            {"_id": id}
        )
    ) is not None:
        return existing_task

    raise HTTPException(status_code=404, detail=f"Task {id} not found")
```

This is currently the most complex function in `routers.py`,
although it can be simplified by using
[find_one_and_update](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find_one_and_update),
which can update and then return a document in a single operation.

The important lines of this function are:

```python
task = {k: v for k, v in task.dict().items() if v is not None}

    if len(task) >= 1:
        update_result = await request.app.mongodb.get_collection("tasks").update_one(
            {"_id": id}, {"$set": task}
        )
```

The first line collects any attributes from the provided task object,
and converts them to a dict. This is a dict of all the document fields that should be updated in the MongoDB document, allowing you to do a partial update of a document, rather than overwriting it.

The last line (broken over 3 lines) updates a single document.
The first parameter specifies which document should be updated,
by "_id",
and the second parameter is a set of update instructions.
In this case the update instruction is `$set`,
which takes a dict of fields to update as a parameter.

In order to call this route from your React component,
you'll need to listen for clicks on the "Save" button,
and make a `PUT` request to this endpoint.

# Handling checkbox events, and sending them to the server

Because you now need to handle checkbox events from the items in the list, 
you'll be editing `Item.js` in the frontend app.

Have a look at the Item component, and add the following event handler into the component function:

```js
async function checkboxChange(event) {
    task.completed = event.target.checked

    await fetch(`/task/${task._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: task.completed
        }),
    })
}
```

This function will handle checkbox change events by extracting the new "checked" status from the event,
and then sending a `PUT` request the new state to the PUT endpoint we looked above.

Once again, you'll need to hook the event handler into the HTML component:

```js
<input type="checkbox" defaultChecked={task.completed} onChange={checkboxChange} />
```

When you've done this, 
flip back to your browser,
and click on one of the checkboxes.
Then go to your Atlas tab, hit the "Apply" button,
and check that the new state has been stored.