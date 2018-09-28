/* eslint-env browser */

const authorProfile = require("./author-profile");
const apolloClient = require("./make-client-ac");
const runClient = require("./run-client");

runClient(authorProfile(apolloClient(), window.nuk.slug, window.nuk.page));
