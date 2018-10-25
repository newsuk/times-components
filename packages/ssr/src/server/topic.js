const topic = require("../component/topic");
const runServer = require("../lib/run-server");

module.exports = (slug, page) => runServer(topic, slug, page);
