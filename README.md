# Dashboard SLA

## Progress

First, **I converted the application from vue2 to vue3.** To do this, I updated/removed/added dependencies in *package.json* and changed some of the base code in main.js.

Next, I worked on **separating the code into managable single-functionality components.** I created separate vue components for the hide-bar and the actual table. Then, I extracted the table header and made it its own component. Throughout this process, I cleaned up the redundant code.

Next, I color coded each of the rows by the status and create a legend to show the colorscheme.

Next, **I implemented some pagination functionality.** I created a button on the top right in order to look at pages of the data 100 products at a time.


## Decisions

A decision I made when implementing pagination was to maintain a sorted ordering of the rows in the table by status. If I were to disregard the order, I could simply implement pagination while reading in the data file. However, to maintain order, I first read in all the products in the data, kept track of the statuses, and sorted them based on that. Then, I only retained the products with indicies relavent to the current page.


## Local Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Bonus Features