const defaultMapProfileToConfig = require("../../lib/ads/make-author-profile-ad-config")
  .defaultClient;
const makeArticleUrl = require("../../lib/make-url");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  ...window.nuk.ssr,
  makeArticleUrl,
  mapProfileToAdConfig: defaultMapProfileToConfig,
  rootTag
};
