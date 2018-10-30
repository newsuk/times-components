/* eslint-env browser */

const authorProfile = require("../../component/author-profile");
const runClient = require("../../lib/run-client");

module.exports = (makeArticleUrl, mapProfileToAdConfig) => {
  const { debounceTimeMs, page, pageSize, slug } =
    (window.nuk && window.nuk.authorProfile) || {};

  const data = {
    debounceTimeMs,
    makeArticleUrl,
    mapProfileToAdConfig,
    page,
    pageSize,
    slug
  };

  const useGET = true;

  runClient(authorProfile, useGET, data);
};
