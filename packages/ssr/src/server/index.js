const articleServer = require("./article");
const authorProfileServer = require("./author-profile");

module.exports = {
  article: articleServer,
  authorProfile: authorProfileServer,
};
