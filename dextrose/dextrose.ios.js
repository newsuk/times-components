const path = require("path");

const config = {	
    snapPath: __dirname+'/snappy',
    automationName: "XCUITest",
    platformName: "iOS",
    deviceName: "iPhone 7",
    platformVersion: '11.0',
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
        "TrackingPage",
        "TrackingEvent"
    ]
}

module.exports = config;
