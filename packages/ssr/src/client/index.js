const articleClient = require("./article");
const authorProfileClient = require("./author-profile");
const topicClient = require("./topic");

module.exports = {
  article: articleClient,
  authorProfile: authorProfileClient,
  topic: topicClient
};
