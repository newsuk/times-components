/* eslint-disable no-console */

const express = require("express");
const shrinkRay = require("shrink-ray");

const ssr = require("../server");
const makeArticleUrl = require("../lib/make-url");

const port = 3000;
const server = express();

server.use(shrinkRay());
server.use(express.static("dist"));

const makeHtml = (
  initialState,
  initialProps,
  { bundleName, extraStyles, markup, styles, title }
) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>
            ${styles}
            ${extraStyles}
          </head>
          <body style="margin:0">
            <script>window.nuk = {graphqlapi: {url: "${
              process.env.GRAPHQL_ENDPOINT
            }"}, tracking: {enabled: false}};</script>
            ${initialProps}
            ${initialState}
            <div id="main-container">${markup}</div>
          </body>
          <script src="/vendor.bundle.js"></script>
          <script src="/${bundleName}.bundle.js"></script>
        </html>
      `;

const toNumber = input => {
  const parsed = Number.parseInt(input, 10);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
};

server.get("/article/:id", (request, response) => {
  const {
    params: { id }
  } = request;
  const uri = process.env.GRAPHQL_ENDPOINT;
  const headers = process.env.GRAPHQL_TOKEN
    ? {
        "nuk-tpatoken": process.env.GRAPHQL_TOKEN
      }
    : null;

  ssr
    .article({ headers, id, makeArticleUrl, uri })
    .then(({ extraStyles, initialProps, initialState, markup, styles }) =>
      response.send(
        makeHtml(initialState, initialProps, {
          bundleName: "article",
          extraStyles,
          markup,
          styles,
          title: "Article"
        })
      )
    );
});

server.get("/profile/:slug", (request, response) => {
  const {
    params: { slug },
    query: { page }
  } = request;
  const currentPage = toNumber(page) || 1;
  const uri = process.env.GRAPHQL_ENDPOINT;

  ssr
    .authorProfile({ currentPage, makeArticleUrl, slug, uri })
    .then(({ extraStyles, initialProps, initialState, markup, styles }) =>
      response.send(
        makeHtml(initialState, initialProps, {
          bundleName: "author-profile",
          extraStyles,
          markup,
          styles,
          title: slug
        })
      )
    );
});

server.get("/topic/:slug", (request, response) => {
  const {
    params: { slug },
    query: { page }
  } = request;
  const pageNum = toNumber(page) || 1;
  const uri = process.env.GRAPHQL_ENDPOINT;

  ssr
    .topic({
      makeArticleUrl,
      page: pageNum,
      slug,
      uri
    })
    .then(({ extraStyles, initialProps, initialState, markup, styles }) =>
      response.send(
        makeHtml(initialState, initialProps, {
          bundleName: "topic",
          extraStyles,
          markup,
          styles,
          title: slug
        })
      )
    );
});

const App = server.listen(port, () =>
  console.log(`Serving at http://localhost:${port}`)
);

process.on("SIGTERM", () => {
  App.close(() => {
    process.exit(0);
  });
});
