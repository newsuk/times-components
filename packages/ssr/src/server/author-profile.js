const authorProfile = require("../component/author-profile");
const runServer = require("../lib/run-server");

const defaultMapProfileToConfig = () => ({
    networkId: '',
    adUnit: '',
    pageTargeting: {},
    slotTargeting: {},
    biddersConfig: {},
    bidderSlots: []
});

module.exports = ({ currentPage, debounceTime = 0, makeArticleUrl, perPage = 20, slug, uri }) => {
  const options = {
      debounceTimeMs: debounceTime,
      makeArticleUrl,
      mapProfileToAdConfig: defaultMapProfileToConfig,
      page: currentPage,
      pageSize: perPage,
      slug,
      uri
  };

  runServer(authorProfile, options);
}
