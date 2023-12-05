import { withTrackEvents } from "@times-components/tracking";

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
