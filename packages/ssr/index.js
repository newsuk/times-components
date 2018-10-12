/* eslint-disable no-console */

const express = require("express");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const { fragmentMatcher } = require("@times-components/schema");
const fetch = require("node-fetch");
const { createHttpLink } = require("apollo-link-http");
const shrinkRay = require("shrink-ray");
const getData = require("./get-data");
const adConfig = require("./ad-config.json");
const article = require("./article");
const authorProfile = require("./author-profile");
const topic = require("./topic");

const port = 3000;
const server = express();

server.use(shrinkRay());
server.use(express.static("dist"));

const makeClient = () =>
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      headers: {
        authorization: process.env.AUTH_TOKEN
          ? `Bearer ${process.env.AUTH_TOKEN}`
          : ""
      },
      uri: process.env.GRAPHQL_ENDPOINT
    }),
    cache: new Cache({ addTypename: true, fragmentMatcher })
  });

const makeHtml = (
  client,
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
            window.__APOLLO_STATE__=${JSON.stringify(client.extract()).replace(
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

const toNumber = s => {
  const parsed = Number.parseInt(s, 10);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
};

server.get("/article/:id", (req, res) => {
  const { params: { id } } = req;
  const client = makeClient();
  const App = article(client, id);

  getData(App).then(props =>
    res.send(
      makeHtml(
        client,
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

server.get("/profile/:slug", (req, res) => {
  const { params: { slug }, query: { page } } = req;
  const pageNum = toNumber(page) || 1;
  const client = makeClient();
  const App = authorProfile(client, slug, pageNum);

  getData(App).then(props =>
    res.send(
      makeHtml(
        client,
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

server.get("/topic/:slug", (req, res) => {
  const { params: { slug }, query: { page } } = req;
  const pageNum = toNumber(page) || 1;
  const client = makeClient();
  const App = topic(client, slug, pageNum);

  getData(App).then(props =>
    res.send(
      makeHtml(
        client,
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
