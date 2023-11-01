# Dashboard SLA

## Progress

First, **I converted the application from vue2 to vue3.** To do this, I updated/removed/added dependencies in *package.json* and changed some of the base code in main.js.

Next, I worked on **separating the code into managable single-functionality components.** I created separate vue components for the hide-bar and the actual table. Then, I extracted the table header and made it its own component. Throughout this process, I cleaned up the redundant code.

Next, I color coded each of the rows by the status and create a legend to show the colorscheme


## Decisions



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