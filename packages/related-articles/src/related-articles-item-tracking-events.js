import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ article: { headline, id, url, shortHeadline } }) => ({
          targetArticleHeadline: shortHeadline || headline,
          targetArticleId: id,
          targetArticleUrl: url
        })
      }
    ]
  });
