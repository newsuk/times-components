/* eslint-disable no-useless-escape */

const article = require("../component/article");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.article) {
  const {
    rootTag,
    makeArticleUrl,
    makeTopicUrl,
    mapArticleToAdConfig
  } = window.nuk.ssr;
  const {
    articleId,
    debounceTimeMs,
    navigationMode,
    spotAccountId,
    paidContentClassName,
    userState,
    isPreview
  } = window.nuk.article;
  const { getCookieValue } = window.nuk;

  const data = {
    articleId,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    navigationMode,
    getCookieValue,
    mapArticleToAdConfig,
    spotAccountId,
    paidContentClassName,
    userState,
    isPreview
  };

  const clientOptions = {
    rootTag,
    useGET: false
  };

  runClient(article, clientOptions, data);
}
