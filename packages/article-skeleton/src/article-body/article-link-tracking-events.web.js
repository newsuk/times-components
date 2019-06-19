import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ target, url }) => ({
          url,
          target
        }),
        trackingName: "ArticleLink"
      }
    ]
  });
