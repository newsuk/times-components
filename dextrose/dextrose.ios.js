const path = require("path");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  automationName: "XCUITest",
  platformName: "iOS",
  deviceName: "iPhone 7",
  platformVersion: "11.2",
  app: path.join(
    __dirname,
    "../ios/build/Build/Products/Debug-iphonesimulator/storybooknative.app"
  ),
  ignoredStories: [
    "Advertisement",
    "AuthorHeadTracking",
    "AuthorProfileTracking",
    "Brightcove",
    "PaginationTracking",
    "Provider",
    "TrackingPage",
    "TrackingEvent",
    "error"
  ]
};

module.exports = config;
