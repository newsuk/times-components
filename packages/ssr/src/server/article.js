const article = require("../component/article");
const runServer = require("../lib/run-server");
const adConfig = require("../lib/make-ad-config");

module.exports = async id => {
  const data = await runServer(article, id, adConfig);
  return { ...data, adConfig: adConfig() };
};
