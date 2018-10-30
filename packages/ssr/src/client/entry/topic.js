const topic = require("../common/topic");
const makeArticleUrl = require("../../lib/make-url");
const defaultMapTopicToConfig = require("../../lib/make-ad-config")
  .defaultClient;

topic(makeArticleUrl, defaultMapTopicToConfig);
