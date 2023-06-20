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
    zephrDivs,
    sharingSavingFlag = true,
    commentingFlag = true,
    showAudioPlayer
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
    zephrDivs,
    sharingSavingFlag,
    commentingFlag,
    showAudioPlayer
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
