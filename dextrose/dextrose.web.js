const path = require("path");

const config = {	
    snapPath: __dirname+'/snappy',
    platformName: "web",
    ignoredStories: [
        "Ad",
    	"AuthorHeadTracking",
    	"AuthorProfileTracking",
        "Brightcove",
        "PaginationTracking",
        "TrackingPage",
        "TrkingEvent"
    ]
}

module.exports = config;
