require("@babel/register");
const path = require("path");
const express = require("express");
const renderHtml = require("./src/renderHtml");

const app = express()

app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.listen(8000);

let initialState = {
   hotels: { 
    isFetching: false,
    locations:[],
    hotels: [],
    hotel : null,
    error: ""
  }
}

app.get('/', (_, res) => {
  const { preloadedState, content } = renderHtml(initialState)
  const response = createPage(preloadedState, content)
  res.send(response);
});

function createPage(html, preloadedState){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title> Google Search - SSR  </title>
      <link rel="stylesheet" href="build/styles.css" />
    </head>
    <body>
      <div class="content">
         <div id="root" class="wrap-inner">
            ${html || ""}
         </div>
      </div>
      <script>
          window.__STATE__ = ${JSON.stringify(preloadedState) ||  ""}
      </script>
      <script src="build/index.js"></script>
    </body>
    `
}