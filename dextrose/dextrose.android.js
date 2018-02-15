const path = require("path");
const ignoredStories = require("./ignoredStories");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "Android",
  ignoredStories: [
    "Advertisement",
    "AuthorHeadTracking",
    "AuthorProfileTracking",
    "Brightcove",
    "PaginationTracking",
    "Provider",
    "TrackingPage",
    "TrackingEvent",
    "Error",
    "error",
    "AuthorProfileLoading"
  ]
};

module.exports = config;
