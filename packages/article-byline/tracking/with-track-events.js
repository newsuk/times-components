import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onAuthorPress",
        getAttrs: ({ slug, url }) => ({
          slug,
          url
        }),
        trackingName: "ArticlePressAuthor"
      }
    ]
  });
