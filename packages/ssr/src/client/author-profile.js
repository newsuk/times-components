/* eslint-env browser */

const authorProfile = require("../component/author-profile");
const runClient = require("../lib/run-client");

module.exports = (makeArticleUrl, mapProfileToAdConfig) => {
  const {
    debounceTimeMs,
    page,
    pageSize,
    slug
  } = window.nuk.authorProfile || {};

  const props = {
    analyticsStream: reporter.analytics,
    debounceTimeMs,
    makeArticleUrl,
    mapProfileToAdConfig,
    page,
    pageSize,
    slug
  };

  runClient(authorProfile, props);
};
