const defaultMapArticleToConfig = require("../../lib/ads/make-article-ad-config")
  .defaultClient;
const makeArticleUrl = require("../../lib/make-url");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  ...window.nuk.ssr,
  makeArticleUrl,
  mapArticleToAdConfig: defaultMapArticleToConfig,
  rootTag
};
