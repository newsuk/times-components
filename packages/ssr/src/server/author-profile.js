const authorProfile = require("../component/author-profile");
const runServer = require("../lib/run-server");

const defaultMapProfileToConfig = () => ({
    adUnit: '',
    biddersConfig: {},
    bidderSlots: [],
    networkId: '',
    pageTargeting: {},
    slotTargeting: {}
});

module.exports = ({ currentPage, debounceTime = 0, makeArticleUrl, perPage = 20, slug, uri }) => {
  const options = {
      debounceTimeMs: debounceTime,
      makeArticleUrl,
      mapProfileToAdConfig: defaultMapProfileToConfig,
      name: 'authorProfile',
      page: currentPage,
      pageSize: perPage,
      slug,
      uri
  };

  return runServer(authorProfile, options);
}
