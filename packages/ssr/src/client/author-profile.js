/* eslint-env browser */

const authorProfile = require("../component/author-profile");
const runClient = require("../lib/run-client");

runClient(authorProfile, window.nuk.slug, window.nuk.page);
