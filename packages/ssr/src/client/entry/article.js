const article = require("../common/article");
const makeArticleUrl = require("../../lib/make-url");
const defaultMapArticleToConfig = require("../../lib/make-ad-config")
  .defaultClient;

const rootTag = "main-container";

article(rootTag, makeArticleUrl, defaultMapArticleToConfig);
