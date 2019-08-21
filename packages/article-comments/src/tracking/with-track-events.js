import { withTrackEvents } from "@times-components/tracking";

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
