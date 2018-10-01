/* eslint-env browser */

const article = require("./article");
const apolloClient = require("./make-client-ac");
const runClient = require("./run-client");

runClient(article(apolloClient(), window.nuk.id, window.nuk.adConfig));
