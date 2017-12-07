const path = require("path");

const config = {
  snapPath: __dirname + "/snappy",
  platformName: "web",
  ignoredStories: [
    "Advertisement",
    "AuthorHeadTracking",
    "AuthorProfileTracking",
    "Brightcove",
    "PaginationTracking",
    "Provider",
    "TrackingPage",
    "TrackingEvent"
  ]
};

module.exports = config;
