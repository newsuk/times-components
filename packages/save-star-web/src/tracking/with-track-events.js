import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onSaveButtonPress",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline
        }),
        trackingName: "ArticleSaveToMyArticles"
      }
    ]
  });
