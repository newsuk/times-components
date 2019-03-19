import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({
          tile: {
            headline: tileHeadline,
            article: { headline, id, shortHeadline, url } = {}
          } = {
            article: {}
          },
          tileName
        }) => ({
          articleHeadline: shortHeadline || tileHeadline || headline,
          articleId: id,
          articleUrl: url,
          tileName
        }),
        trackingName: "Tile"
      }
    ]
  });
