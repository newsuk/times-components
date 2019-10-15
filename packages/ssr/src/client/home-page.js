const homePage = require("../component/home-page");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.homePage) {
  const {
    rootTag,
    makeArticleUrl,
    makeTopicUrl,
    mapProfileToAdConfig
  } = window.nuk.ssr;
  const { editionId, debounceTimeMs } = window.nuk.homePage;

  const data = {
    editionId,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    mapProfileToAdConfig
  };

  const clientOptions = {
    rootTag,
    useGET: true
  };

  runClient(homePage, clientOptions, data);
}
