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
      },
      {
        actionName: "navigation",
        eventName: "onCommentNotification",
        trackingName: "spot im : notification"
      },
      {
        actionName: "navigation",
        eventName: "onCommentFilterNewest",
        trackingName: "spot im : filter : newest"
      },
      {
        actionName: "navigation",
        eventName: "onCommentFilterMostRecommended",
        trackingName: "spot im : filter : best"
      },
      {
        actionName: "navigation",
        eventName: "onCommentFilterOldest",
        trackingName: "spot im : filter : oldest"
      },
      {
        actionName: "navigation",
        eventName: "onCommentReplyClick",
        trackingName: "spot im : reply"
      },
      {
        actionName: "navigation",
        eventName: "onCommentSettingsClick",
        trackingName: "spot im : settings: profile"
      },
      {
        actionName: "navigation",
        eventName: "onCommentShareLink",
        trackingName: "spot im : comment : share : copy link"
      },
      {
        actionName: "navigation",
        eventName: "onCommentShareEmail",
        trackingName: "spot im : comment : share : email"
      },
      {
        actionName: "navigation",
        eventName: "onCommentShareTwitter",
        trackingName: "spot im : comment : share : twitter"
      },
      {
        actionName: "navigation",
        eventName: "onCommentShareFacebook",
        trackingName: "spot im : comment : share : facebook"
      }
    ]
  });
