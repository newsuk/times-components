const article = require("../component/article");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.article) {
  const {
    rootTag,
    makeArticleUrl,
    makeTopicUrl,
    mapArticleToAdConfig
  } = window.nuk.ssr;
  const { articleId, debounceTimeMs, spotAccountId } = window.nuk.article;
  const { getCookieValue } = window.nuk;

  const data = {
    articleId,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    getCookieValue,
    mapArticleToAdConfig,
    spotAccountId,
    userState: window.nuk.user
  };

  const clientOptions = {
    rootTag,
    useGET: false
  };

  runClient(article, clientOptions, data);
}
