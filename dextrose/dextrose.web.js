const path = require("path");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
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
  ],
  breakpoints: [520]
};

module.exports = config;
