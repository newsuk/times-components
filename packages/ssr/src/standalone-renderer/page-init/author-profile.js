const defaultMapProfileToConfig = require("../../lib/make-ad-config")
  .defaultClient;
const makeArticleUrl = require("../../lib/make-url");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  makeArticleUrl,
  mapProfileToAdConfig: defaultMapProfileToConfig,
  rootTag
};
