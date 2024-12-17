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
    articleDataFromRender,
    paidContentClassName,
    userState,
    isPreview,
    swgProductId,
    zephrDivs,
    sharingSavingFlag = true,
    commentingFlag = true,
    showAudioPlayer,
    storefrontConfig,
    hasCommentingEntitlement
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
    articleDataFromRender,
    paidContentClassName,
    userState,
    isPreview,
    swgProductId,
    zephrDivs,
    sharingSavingFlag,
    commentingFlag,
    showAudioPlayer,
    storefrontConfig,
    hasCommentingEntitlement
  };

  const clientOptions = {
    rootTag,
    useGET: true,
    headers: {
      "x-new-topic-data-source": true
    },
    zephrDivs,
    showAudioPlayer
  };

  runClient(article, clientOptions, data);
}
