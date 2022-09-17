+++
title = "Spin Up a Cluster"
template = "docs/page.html"
weight = 10
sort_by = "weight"
+++

Once you have a MongoDB Atlas account,
and you're logged in,
click on the "Create" button.
It'll take you to a page to configure your new MongoDB cluster.

![Create](../create_button.png)

If you haven't created a cluster before, the Create button,
or something like it,
should be in the middle of the screen after you log in.

If you _have_ already created a cluster (go you!)
then it'll be on the right-hand side,
above any clusters that you've already spun up.
In this case,
you _could_ use the existing cluster.
Just make sure that the database name we configure doesn't conflict with any databases you've already created.

## Configure your cluster

{{ rimage(path="docs/getting-set-up/new_cluster_form.png") }}

Select the "Shared" tab at the top of the form,
and then select a region that's near you.
I chose "Ireland" because that was my nearest location when I wrote this.

Make sure your cluster tier is M0 Sandbox - that's the free tier.
At this point you can name your cluster.
You won't get another chance!
The name can just be something useful for you.
It doesn't need to be unique.

Now click the big green "Create Cluster" button,
and jump to the [next page](../getting-the-code) while you wait for your cluster to be configured for you.
It usually takes 3-7 minutes, but you won't need it for a little while.