const articleServer = require("./article");
const authorProfileServer = require("./author-profile");
const homePageServer = require("./home-page");
const topicServer = require("./topic");

module.exports = {
  article: articleServer,
  authorProfile: authorProfileServer,
  homePage: homePageServer,
  topic: topicServer
};
