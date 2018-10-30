/* eslint-env browser */

const authorProfile = require("../../component/author-profile");
const runClient = require("../../lib/run-client");

module.exports = (rootTag, makeArticleUrl, mapProfileToAdConfig) => {
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

  const clientOptions = {
    rootTag,
    useGET: true
  };

  runClient(authorProfile, clientOptions, data);
};
