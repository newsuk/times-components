const authorProfile = require("../component/author-profile");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.authorProfile) {
  const { rootTag, makeArticleUrl, mapProfileToAdConfig } = window.nuk.ssr;
  const { debounceTimeMs, page, pageSize, slug } = window.nuk.authorProfile;

  const data = {
    debounceTimeMs,
    makeArticleUrl,
    mapProfileToAdConfig,
    page,
    pageSize,
    slug
  };

  const clientOptions = {
    rootTag,
    useGET: true
  };

  runClient(authorProfile, clientOptions, data);
}
