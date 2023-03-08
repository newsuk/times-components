/* eslint-disable no-useless-escape */

const article = require("../component/article");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.article) {
  const { rootTag, makeArticleUrl, makeTopicUrl } = window.nuk.ssr;
  const {
    articleId,
    debounceTimeMs,
    navigationMode,
    commentingConfig,
    paidContentClassName,
    userState,
    isPreview,
    swgProductId,
    commentCount,
    zephrDivs,
    sharingSavingFlag = true,
    commentingFlag = true
  } = window.nuk.article;
  const { getCookieValue } = window.nuk;

  const data = {
    articleId,
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    navigationMode,
    getCookieValue,
    commentingConfig,
    paidContentClassName,
    userState,
    isPreview,
    swgProductId,
    commentCount,
    zephrDivs,
    sharingSavingFlag,
    commentingFlag
  };

  const clientOptions = {
    rootTag,
    useGET: false,
    headers: {
      "x-new-topic-data-source": true
    }
  };

  runClient(article, clientOptions, data);
}
