import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ linkType, url }) => ({
          linkType,
          linkUrl: url
        })
      }
    ]
  });
