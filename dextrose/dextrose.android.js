const dextrose = require("dextrose").default;
const path = require("path");

const config = {
    snapPath: __dirname+'/snappy',
    platformName: "Android",
    platformVersion: "5.1",
    deviceName: "Nexus_5X_API_22",
    app: path.join(
        __dirname,
        "../android/app/build/outputs/apk/release/app-release.apk"
    ),
    ignoredStories: [
        "AuthorHeadTracking",
        "AuthorProfileTracking",
        "brightcove",
        "PaginationTracking",
        "TrackingPage",
        "TrackingEvent"
    ]
}

dextrose(config);
