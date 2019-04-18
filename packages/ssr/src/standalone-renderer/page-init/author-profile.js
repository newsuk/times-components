const defaultMapProfileToConfig = require("../../lib/ads/make-author-profile-ad-config")
  .defaultClient;
const makeUrls = require("../../lib/make-urls");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  ...window.nuk.ssr,
  ...makeUrls,
  mapProfileToAdConfig: defaultMapProfileToConfig,
  rootTag
};
