+++
title = "Add a React Component"
template = "docs/page.html"
sort_by = "weight"
weight = 30

[extra]
# lead = "Install Python & NodeJS."
toc = true
+++

React apps are made up of [Components](https://reactjs.org/docs/react-component.html).
React components are very clever and can get a bit complex, but a simple React component is just a function that returns some HTML.

# Create the NewItem component

Create a file called `NewItem.js` in the src folder of the `frontend` app.
Paste (or type) the following code into it:

```js
// frontend/src/NewItem.js

import { useState } from "react"

function NewItem() {
    return (
        <div>
            <h1>New Todo</h1>
            <input />
            <button>Save</button>
        </div>
    )
}

export default NewItem
```

Now modify `App.js` to import and use the new component.

```js
// frontend/src/App.js

// Add this to the import statements at the top:
import NewItem from "./NewItem"

// Modify the `Col` so that it looks like this:
<Col span={14} offset={5}>
    <NewItem />
    <div>{tasks.reverse().map((task) => (<Item key={task._id} task={task} />))}</div>
</Col>
```

If you're still running both your backend and frontend apps,
you shouldn't even need to refresh the browser.
It should now look a little like this:

{{ rimage(path="docs/the-frontend/new-todo.png") }}

The only problem with this component so far,
is that it doesn't actually _do_ anything!

# Making the component do something

There are two steps to making these HTML components do more than just look good.

The first is to monitor the text field, to keep track of its contents.
We need to do this because it's not the React way to lookup an HTML component and extract its value.
Instead, you need to add an event handler to copy the text field's contents into the React component's state.

Inside the `NewItem` function, add the following lines:

```js
    const [text, setText] = useState("");

    function updateText(e) {
        setText(e.target.value);
        console.log("Text field value:", text);
    }
```

The `useState` function is what's called a [React Hook](https://reactjs.org/docs/hooks-state.html).
Explaining how it works is a little out of scope,
but for now assume that it's creating a new internal property for this component,
called `text` that will contain the current value of the text field.
At the same time, it creates a _function_ called `setText` that can be used to update the value of the text field.
(And you shouldn't update that value any other way, or React won't be able to pick up the change.)

The `updateText` function will listen for changes to the text field's contents and update the `text` field you've just declared. I've also added a call to `console.log` so we can see that everything's working at this stage.
Currently the `updateText` function hasn't been hooked up to any events,
so change the `<input>` field's definition to look like this:

```js
<input onChange={updateText} />
```

If you flip back to the browser and type into the text field,
you should see multiple updates appearing in your browser's developer console.

# How will FastAPI save your to-do item?

Now you have the component's state being managed successfully,
it's time to start sending updates to your FastAPI server.

I've already provided the new task function for you.
It's in `backend/apps/todo/routers.py`,
and it looks like this:

```python
@router.post("/", response_description="Add new task")
async def create_task(request: Request, task: TaskModel = Body(...)):
    task = jsonable_encoder(task)
    new_task = await request.app.mongodb.get_collection("tasks").insert_one(task)
    created_task = await request.app.mongodb.get_collection("tasks").find_one(
        {"_id": new_task.inserted_id}
    )
```

This function encodes the provided task object as JSON, inserts it into the collection,
and then retrieves it again to return to the browser.
(Because Rest APIs return documents when an insert or update is made.)

To call this endpoint,
you'll need to make a `POST` request to it from the React component.

# Saving new to-do items

Switch back to `NewItem.js`.
Add the following function into your component:

```js
function save() {
    const newTodo = {
        name: text,
        completed: false,
    }

    fetch("/task/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo),
    })
}
```

This builds an object containing the new task data,
then it posts it to the endpoint above.

Once again, this handler needs to be hooked into the HTML component,
so modify the `<button>` to add an `onClick` handler.

```js
<button onClick={save}>Save</button>
```

Return to the browser, 
type something in the text box,
hit "Save",
and within a second
(because of the polling delay)
you should see a new item appear at the bottom of the list of to-do items!

# What's Next?

Now it's time to check off our last to-do item!
(Sorry!)

When you click any of those checkboxes,
the new state needs to be saved in your database.
Let's do that.