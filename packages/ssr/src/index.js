/* eslint-disable no-console */

const express = require("express");
const shrinkRay = require("shrink-ray");

const ssr = require("./../src/server");
const makeArticleUrl = require("./../src/lib/make-url");

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

// server.get("/article/:id", (request, response) => {
//   const {
//     params: { id }
//   } = request;
//   ssr
//     .article(id)
//     .then(({ adConfig, extraStyles, initialState, markup, styles }) =>
//       response.send(
//         makeHtml(
//           initialState,
//           {
//             adConfig,
//             id
//           },
//           {
//             bundleName: "article",
//             extraStyles,
//             markup,
//             styles,
//             title: "Article"
//           }
//         )
//       )
//     );
// });

server.get("/profile/:slug", (request, response) => {
  const {
    params: { slug },
    query: { page }
  } = request;
  const currentPage = toNumber(page) || 1;
  const uri = process.env.GRAPHQL_ENDPOINT;

  ssr
    .authorProfile({slug, currentPage, makeArticleUrl, uri})
    .then(({ extraStyles, initialProps, initialState, markup, styles }) =>
      response.send(
        makeHtml(
          initialState,
          initialProps,
          {
            bundleName: "author-profile",
            extraStyles,
            markup,
            styles,
            title: slug
          }
        )
      )
    );
});

// server.get("/topic/:slug", (request, response) => {
//   const {
//     params: { slug },
//     query: { page }
//   } = request;
//   const pageNum = toNumber(page) || 1;

//   ssr
//     .topic(slug, pageNum)
//     .then(({ extraStyles, initialState, markup, styles }) =>
//       response.send(
//         makeHtml(
//           initialState,
//           {
//             page: pageNum,
//             slug
//           },
//           {
//             bundleName: "topic",
//             extraStyles,
//             markup,
//             styles,
//             title: slug
//           }
//         )
//       )
//     );
// });

const App = server.listen(port, () =>
  console.log(`Serving at http://localhost:${port}`)
);

process.on("SIGTERM", () => {
  App.close(() => {
    process.exit(0);
  });
});
