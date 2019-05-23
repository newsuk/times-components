import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onSaveButtonPress",
        getAttrs: ({ articleId }) => ({
          articleId
        }),
        trackingName: "ArticleSaveToMyArticles"
      }
    ]
  });
