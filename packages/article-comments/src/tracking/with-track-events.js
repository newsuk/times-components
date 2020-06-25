import { withTrackEvents } from "@times-components-native/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "navigation",
        eventName: "onCommentStart",
        trackingName: "spot im : comment : start"
      },
      {
        actionName: "navigation",
        eventName: "onCommentPost",
        trackingName: "spot im : comment : complete"
      }
    ]
  });
