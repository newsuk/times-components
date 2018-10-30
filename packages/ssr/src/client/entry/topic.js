const topic = require("../common/topic");
const makeArticleUrl = require("../../lib/make-url");
const defaultMapTopicToConfig = require("../../lib/make-ad-config")
  .defaultClient;

const rootTag = "main-container";

topic(rootTag, makeArticleUrl, defaultMapTopicToConfig);
