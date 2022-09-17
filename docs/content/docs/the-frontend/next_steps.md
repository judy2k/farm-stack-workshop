+++
title = "Next steps"
template = "docs/page.html"
sort_by = "weight"
weight = 40

[extra]
toc = true
+++

# Some observations

The following are some thoughts that I have at this point in the workshop.

## React application architecture

If you've done any React programming before,
then you've probably noticed that this is not a very well architected application.

It shows off some core React features,
demonstrating how nicely isolated changes become when you work with its component architecture.
But as this application gets bigger and more complex,
it's going to become less and less maintainable,
because a lot of its functionality is hardwired (paths to FastAPI!),
and distributed through the codebase.

Better architected React apps tend to push state management higher up the component tree.
In this application, I would probably fire changes up to the `App` component, 
and make it responsible for sending updates to the server,
while making instant UI changes which can be later rolled-back if the server updates fail for some reason.
This makes the application more responsive,
because it sends updates to the server in the background,
rather than the current approach of waiting for updates to come back from the server before being rendered!

Potentially at this point, it might be a good idea to start using a [reducer](https://reactjs.org/docs/hooks-reference.html#usereducer) to start handling component events in a manageable way to update the state of the tree of components.

## Polling the server

As mentioned in [An aside about Websockets and Change Streams](@/docs/the-frontend/playing-with-the-ui.md#),
WebSockets or Server Side Events (SSE) and Change Streams would provide a lower-latency,
and also less resource-intensive,
way of receiving updates from the server.

# Next steps

* Try refactoring the app to fire events from `NewItem` and `Item` up to the `App`,  
  and handle those events there.

  You should see that the lower-level components become much more reuseable and maintainable.

* Add the ability to edit each task's description! You can handle a click event on the task to 
  make the component editable.
  
  Your component function gets called every time its state changes,
  so this will involve an extra state field and an if statement in your component function based
  on that field's state.

* Add [authentication]() to your application! This uses some features that are only available when you're hosting on MongoDB Atlas, but it's a really fast way to get authentication working for your application.

  Once you have a concept of a user working, you can remodel your collection so each task list is per-user.
  You might even decide to have each to-do *list* modelled in a single document for each user,
  instad of storing each item separately. 


* Break out of FastAPI, to try connecting Change Streams to Server-Side Events. 
  It'll involve a little more state management on the client side, because you'll be receiving _updates_
  instead of the whole collection state, but it should become really responsive.

* **Have fun!**

  Once you get started, learning React is an incremental process, and it's surprising (to me as a back-end Python programmer) how enjoyable building visual applications can be.