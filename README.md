# Dashboard SLA

## Progress

First, **I converted the application from vue2 to vue3.** To do this, I updated/removed/added dependencies in *package.json* and changed some of the base code in main.js.

Next, I worked on **separating the code into managable single-functionality components.** I created separate vue components for the hide-bar and the actual table. Then, I extracted the table header and made it its own component. Throughout this process, I cleaned up the redundant code.

Next, **I color coded each of the rows by the status and create a legend to show the colorscheme.**

Next, **I implemented some pagination functionality.** I created a button on the top right in order to look at pages of the data 100 products at a time.

Next, **I created a search bar to be able to search for items given a string.** Then, only the product names that contain the string will be shown.

Next, **I created some filtering criteria**, so that a user can filter out certain products that do not match their criteria. I created a way for the user to
filter out each criteria that is shown to them. 

## Decisions

A decision I made when implementing pagination was to maintain a sorted ordering of the rows in the table by status. If I were to disregard the order, I could simply implement pagination while reading in the data file. However, to maintain order, I first read in all the products in the data, kept track of the statuses, and sorted them based on that. Then, I only retained the products with indicies relavent to the current page.

-----

I had to decide when implementing the filtering criteria how I would go about doing it. I could have extended the criteria to account for other attributes of the products
that were not explicity shown to the user in the table. However, I did not think this was a good idea for two reasons.

1. The presence of N/A
2. The fact that the user cannot see them

This might have led to misunderstanding and more confusion from the user. 

## Local Setup

To run this application locally, you must clone the app onto your local machine, install the dependencies, and then run it.

First, lets clone the app using the following code in your terminal. You can get the cloning link from repository on GitHub. [I need help cloning a repository on GitHub.](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
```
git clone <repository_link>
```

Next, after sucessfully cloning the repository, we need to install the dependencies. To do this, run npm install in your project terminal (make sure you have node and npm installed).  [I need help installing Node.js and npm.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```sh
npm install
```

Then, once all the packages we need are installed, we want to be able to run the project for development. To do this, use the following code in your project terminal. 

```sh
npm run dev
```
Congrats! You should now have a development view of the project.

---

If you want to export the project for a production use, use the following code in your project terminal to compile and minify the project. This should create a folder called dist, holding the minified version of your project.
```sh
npm run build
```

Finally, if you want to run the built project locally, you can do the following steps. Run the following code in the project terminal and then navigate to the local host network the project is being hosted on.

```sh
npx serve -s dist
```
Congrats! The build version of the project is running!
## Bonus Features

One of the biggest bonus features that I created was the implementation of the extra filtering criteria. For someone who is trying to search for a very specific product or group of products, having this filter is invaluable as it helps them from searching through thousands (or perhaps more) products individually. This filtering criteria will only accept valid input automatically (strings for string input, positive integers for integer input, and positive decimals for decimal input).

I changed some of the layout of the hide bar and the general layout of the header and the page to make the page more visually pleasing and easier to navigate.

I changed the favicon and html title to fit the page.