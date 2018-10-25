/* eslint-env browser */

const article = require("../component/article");
const runClient = require("../lib/run-client");

runClient(article, window.nuk.id, window.nuk.adConfig);
