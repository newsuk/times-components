const defaultMapArticleToConfig = require("../../lib/ads/make-article-ad-config")
  .defaultClient;
const makeUrls = require("../../lib/make-urls");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  ...window.nuk.ssr,
  ...makeUrls,
  mapArticleToAdConfig: defaultMapArticleToConfig,
  rootTag
};
