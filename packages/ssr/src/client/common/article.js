/* eslint-env browser */

const article = require("../../component/article");
const runClient = require("../../lib/run-client");

module.exports = (makeArticleUrl, mapArticleToAdConfig) => {
  const { id, debounceTimeMs } = (window.nuk && window.nuk.article) || {};

  const data = {
    debounceTimeMs,
    id,
    makeArticleUrl,
    mapArticleToAdConfig
  };

  const useGET = false;

  runClient(article, useGET, data);
};
