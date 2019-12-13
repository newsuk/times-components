import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ slug, url }) => ({
          slug,
          url
        }),
        trackingName: "ArticlePressAuthor"
      }
    ]
  });
