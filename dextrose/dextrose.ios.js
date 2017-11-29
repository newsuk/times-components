const dextrose = require("dextrose").default;
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
    	"AuthorHeadTracking",
    	"AuthorProfileTracking",
        "Brightcove",
        "PaginationTracking",
        "TrackingPage",
        "TrackingEvent"
    ]
}

dextrose(config);