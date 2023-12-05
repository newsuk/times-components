const makeUrls = require("../../lib/make-urls");

const rootTag = "main-container";

window.nuk = window.nuk || {};
window.nuk.ssr = {
  ...window.nuk.ssr,
  ...makeUrls,
  rootTag
};
window.nuk.graphqlapi = {
  ...window.nuk.graphqlapi,
  usePersistedQueries: !!new URLSearchParams(window.location.search).get("pq")
};
