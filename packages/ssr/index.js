/* eslint-disable no-console */

const express = require("express");
const shrinkRay = require("shrink-ray");

const ssr = require("./src/server");

const port = 3000;
const server = express();

server.use(shrinkRay());
server.use(express.static("dist"));

const makeHtml = (
  extract,
  nuk,
  { bundleName, html, rnwStyles, scStyles, title }
) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>
            ${rnwStyles}
            ${scStyles}
            <script>
            window.nuk = ${JSON.stringify(nuk)};
            window.__APOLLO_STATE__=${JSON.stringify(extract).replace(
              /</g,
              "\\\u003c"
            )};
            </script>
          </head>
          <body style="margin:0">
            <div id="app">${html}</div>
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
  ssr.article(id).then(({ props, extract, adConfig }) =>
    response.send(
      makeHtml(
        extract,
        {
          adConfig,
          id
        },
        {
          ...props,
          bundleName: "article",
          title: "Article"
        }
      )
    )
  );
});

server.get("/profile/:slug", (request, response) => {
  const {
    params: { slug },
    query: { page }
  } = request;
  const pageNum = toNumber(page) || 1;

  ssr.authorProfile(slug, pageNum).then(({ props, extract }) =>
    response.send(
      makeHtml(
        extract,
        {
          page: pageNum,
          slug
        },
        {
          ...props,
          bundleName: "author-profile",
          title: slug
        }
      )
    )
  );
});

server.get("/topic/:slug", (request, response) => {
  const {
    params: { slug },
    query: { page }
  } = request;
  const pageNum = toNumber(page) || 1;

  ssr.topic(slug, pageNum).then(({ props, extract }) =>
    response.send(
      makeHtml(
        extract,
        {
          page: pageNum,
          slug
        },
        {
          ...props,
          bundleName: "topic",
          title: slug
        }
      )
    )
  );
});

server.listen(port, () => console.log(`Serving at http://localhost:${port}`));
