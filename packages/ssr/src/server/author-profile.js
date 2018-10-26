const authorProfile = require("../component/author-profile");
const runServer = require("../lib/run-server");

module.exports = (slug, page) => runServer(authorProfile, slug, page);
