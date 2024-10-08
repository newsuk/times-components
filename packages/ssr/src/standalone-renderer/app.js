/* eslint-disable no-console */

const express = require("express");

const ssr = require("../server");
const makeUrls = require("../lib/make-urls");
const logger = require("../lib/simple-logger");

const port = 3000;
const server = express();

server.use(express.static("dist"));

const makeHtml = (
  initialState,
  initialProps,
  { bundleName, headMarkup, markup, responsiveStyles, styles }
) => `
        <!DOCTYPE html>
        <html>
          <style>
            html {
              scroll-behavior: smooth;
            }
          </style>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${headMarkup}
            ${styles}
            ${responsiveStyles}
            <style>
            * { box-sizing: border-box; }
            #nav {
              height: 50px;
              position: fixed;
              background-color: rgb(19, 53, 78);
              width: 100%;
              left: 0;
              z-index: 9;
              top: 0;
            }
            #main-container {
              margin-top: 50px;
            }
            @media screen and (max-width: 800px) {
              #nav { height: 30px; }
              #main-container { margin-top: 30px; }
            }
            </style>
          </head>
          <body style="margin:0">
            <script>window.nuk = {
              getCookieValue: () => "cookie",
              graphqlapi: {url: "${process.env.GRAPHQL_ENDPOINT}"},
              tracking: {enabled: false}
            };</script>
            ${initialProps}
            ${initialState}
             <div id="nav"></div>
            <div id="main-container">${markup}</div>
          </body>
          <script src="/common.react.bundle.js"></script>
          <script src="/${bundleName}.init.js"></script>
          <script src="/${bundleName}.react.bundle.js"></script>
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
    params: { id: articleId },
    query: { pq }
  } = request;
  const graphqlApiUrl = process.env.GRAPHQL_ENDPOINT;
  const commentingConfig = {
    account: process.env.SPOT_ID
  };

  const headers = process.env.GRAPHQL_TOKEN
    ? {
        "nuk-tpatoken": process.env.GRAPHQL_TOKEN
      }
    : null;

  const userState = {
    isLoggedIn: true
  };

  ssr
    .article(
      articleId,
      headers,
      {
        ...makeUrls,
        graphqlApiUrl,
        usePersistedQueries: !!pq,
        logger,
        commentingConfig
      },
      userState
    )
    .then(
      ({
        initialProps,
        initialState,
        headMarkup,
        markup,
        responsiveStyles,
        styles
      }) =>
        response.send(
          makeHtml(initialState, initialProps, {
            bundleName: "article",
            headMarkup,
            markup,
            responsiveStyles,
            styles
          })
        )
    );
});

server.get("/profile/:slug", (request, response) => {
  const {
    params: { slug: authorSlug },
    query: { page, pq }
  } = request;
  const currentPage = toNumber(page) || 1;
  const graphqlApiUrl = process.env.GRAPHQL_ENDPOINT;

  ssr
    .authorProfile(
      { authorSlug, currentPage },
      { ...makeUrls, graphqlApiUrl, usePersistedQueries: !!pq, logger }
    )
    .then(
      ({
        initialProps,
        initialState,
        headMarkup,
        markup,
        responsiveStyles,
        styles
      }) =>
        response.send(
          makeHtml(initialState, initialProps, {
            bundleName: "author-profile",
            headMarkup,
            markup,
            responsiveStyles,
            styles
          })
        )
    );
});

const serviceName = "Stand-alone renderer server";

const App = server.listen(port, () =>
  console.log(`🚀  ${serviceName} ready at http://localhost:${port}`)
);

process.on("SIGTERM", () => {
  App.close(() => {
    console.log(`${serviceName} closed`);
  });
});
