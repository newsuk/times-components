const articleServer = require("./article");
const authorProfileServer = require("./author-profile");
const topicServer = require("./topic");

module.exports = {
  article: articleServer,
  authorProfile: authorProfileServer,
  topic: topicServer
};
