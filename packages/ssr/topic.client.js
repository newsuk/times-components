/* eslint-env browser */

const topic = require("./topic");
const apolloClient = require("./make-client-ac");
const runClient = require("./run-client");

runClient(topic(apolloClient(), window.nuk.identifier, window.nuk.page));
