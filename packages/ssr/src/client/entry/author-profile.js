const authorProfile = require("../common/author-profile");
const makeArticleUrl = require("../../lib/make-url");
const defaultMapProfileToConfig = require("../../lib/make-ad-config");

authorProfile(makeArticleUrl, defaultMapProfileToConfig);
