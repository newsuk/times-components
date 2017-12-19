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
  breakpoints: [
    520,
    860,
    1024,
    1182
  ]
};

module.exports = config;
