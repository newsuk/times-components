/* eslint-disable no-console */

const express = require("express");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache: Cache } = require("apollo-cache-inmemory");
const { fragmentMatcher } = require("@times-components/schema");
const fetch = require("node-fetch");
const { createHttpLink } = require("apollo-link-http");
const getData = require("./get-data");
const authorProfile = require("./author-profile");
const topic = require("./topic");

const port = 3000;
const server = express();

const makeClient = () =>
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: process.env.GRAPHQL_ENDPOINT
    }),
    cache: new Cache({ addTypename: true, fragmentMatcher })
  });





const makeHtml = (
  client,
  identifier,
  { bundleName, html, rnwStyles, scStyles, title }
) => `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            ${rnwStyles}
            ${scStyles}
            <script>
            window.nuk = { identifier: "${identifier}" };
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

server.get("/profile/:slug", (req, res) => {
  const { params: { slug } } = req;
  const client = makeClient();
  const App = authorProfile(client, slug);

  getData(App).then(props =>
    res.send(
      makeHtml(client, slug, {
        ...props,
        bundleName: "author-profile",
        title: slug
      })
    )
  );
});

server.get("/topic/:slug", (req, res) => {
  const { params: { slug } } = req;
  const client = makeClient();
  const App = topic(client, slug);

  getData(App).then(props =>
    res.send(
      makeHtml(client, slug, {
        ...props,
        bundleName: "topic",
        title: slug
      })
    )
  );
});

server.use(express.static("dist"));

server.listen(port, () => console.log(`Serving at http://localhost:${port}`));
