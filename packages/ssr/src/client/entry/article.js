const article = require("../common/article");
const makeArticleUrl = require("../../lib/make-url");
const defaultMapArticleToConfig = require("../../lib/make-ad-config");

article(makeArticleUrl, defaultMapArticleToConfig);
