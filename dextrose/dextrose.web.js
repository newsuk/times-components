const dextrose = require("dextrose").default;
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
        "TrackingEvent"
    ]
}

dextrose(config);
