+++
title = "Exploring the FastAPI interface"
template = "docs/page.html"
weight = 100

[extra]
lead = "Load up the FastAPI interface in the browser, and have a play around."
toc = true
+++

In your browser, open up [http://localhost:8000/docs](http://localhost:8000/docs).
It should look something like this:

{{ rimage(path="docs/the-backend/fastapi_tasks.png") }}

## List existing to-do items

If you click on the first bar FastAPI will show you the valid parameters for this endpoint (there aren't any).
Click on "Try It Out" and then on the big "Execute" button that appears.
If you scroll down, you should see that the body of the response is empty.
That's because you don't have any tasks in your to-do list yet.

## Add some to-do items!

Click on the **second** bar, then "Try It Out".
A text box will appear, filled out with a (mostly) valid task.
Delete the "id" line (we'll allow MongoDB to create ids for us).
Then change the value of the "description" parameter. 
Click "Execute"

Maybe do this another 2 or 3 times, and feel free to change the value of "completed" to `false` in one or two of them.

Now if you repeat list the existing items again, you should see some items!

For extra credit, you could use a tool like `curl` or `httpie` or [Postman](https://www.postman.com/product/rest-client/) to make these requests. It's a real, fully-validated API!

## Have a look at the code

It's worth looking at some of the python files in the project, to get an idea how it all fits together.
There is some interesting code in `main.py` that configures the database connection,
but really all the interesting code is under the `apps/todo` directory, where `models.py` defines the schemas that define the Rest interface, and `routers` configures the location and behaviour of the different API endpoints.
