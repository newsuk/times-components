const path = require("path");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "Android",
  platformVersion: "7.1.1",
  deviceName: "Nexus_5X_API_25",
  app: path.join(
    __dirname,
    "../android/app/build/outputs/apk/release/app-release.apk"
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
