const path = require("path");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "iOS",
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
