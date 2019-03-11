import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({
          tile: { article: { headline, id, shortHeadline, url } = {} } = {
            article: {}
          },
          tileName
        }) => ({
          articleHeadline: shortHeadline || headline,
          articleId: id,
          articleUrl: url,
          tileName
        }),
        trackingName: "Tile"
      }
    ]
  });
