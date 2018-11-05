const defaultMapArticleToConfig = require("../../lib/make-ad-config")
  .defaultClient;
const makeArticleUrl = require("../../lib/make-url");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  makeArticleUrl,
  mapArticleToAdConfig: defaultMapArticleToConfig,
  rootTag
};
