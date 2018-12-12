const defaultMapTopicToConfig = require("../../lib/ads/make-topic-ad-config")
  .defaultClient;
const makeArticleUrl = require("../../lib/make-url");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  ...window.nuk.ssr,
  makeArticleUrl,
  mapTopicToAdConfig: defaultMapTopicToConfig,
  rootTag
};
