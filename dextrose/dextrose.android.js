const path = require("path");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "Android",
  platformVersion: "5.1",
  deviceName: "Nexus_5X_API_22",
  app: path.join(
    __dirname,
    "../android/app/build/outputs/apk/debug/app-debug.apk"
  ),
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
