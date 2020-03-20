const authorProfile = require("../component/author-profile");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.authorProfile) {
  const { rootTag, makeArticleUrl, makeTopicUrl } = window.nuk.ssr;
  const {
    authorSlug,
    debounceTimeMs,
    page,
    pageSize
  } = window.nuk.authorProfile;

  const data = {
    authorSlug,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    page,
    pageSize
  };

  const clientOptions = {
    rootTag,
    useGET: true,
    skipAuthorization: true
  };

  runClient(authorProfile, clientOptions, data);
}
