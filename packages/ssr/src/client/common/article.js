/* eslint-env browser */

const article = require("../../component/article");
const runClient = require("../../lib/run-client");

module.exports = (rootTag, makeArticleUrl, mapArticleToAdConfig) => {
  const { id, debounceTimeMs } = (window.nuk && window.nuk.article) || {};

  const data = {
    debounceTimeMs,
    id,
    makeArticleUrl,
    mapArticleToAdConfig
  };

  const clientOptions = {
    rootTag,
    useGET: false
  };

  runClient(article, clientOptions, data);
};
