import { withTrackEvents } from "@times-components-native/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onAuthorPress",
        getAttrs: ({ name, slug }) => ({
          name,
          slug
        }),
        trackingName: "ArticlePressAuthor"
      }
    ]
  });
