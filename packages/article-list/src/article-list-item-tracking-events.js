import { withTrackEvents } from "@times-components-native/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ article: { headline, id }, index, length }) => ({
          articleHeadline: headline,
          articleId: id,
          scrollDepth: {
            itemNumber: index + 1,
            total: length
          }
        })
      }
    ]
  });
