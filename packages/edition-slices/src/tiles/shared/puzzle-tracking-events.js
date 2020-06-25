import { withTrackEvents } from "@times-components-native/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ id, title, url }) => ({
          puzzleId: id,
          puzzleTitle: title,
          puzzleUrl: url,
          tileName: "Puzzle"
        }),
        trackingName: "Tile"
      }
    ]
  });
