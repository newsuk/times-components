const article = require("../component/article");
const runServer = require("../lib/run-server");
const adConfig = require("../config/ad.json");

module.exports = async id => {
  const { extract, props } = await runServer(article, id, adConfig);
  return { adConfig, extract, props };
};
