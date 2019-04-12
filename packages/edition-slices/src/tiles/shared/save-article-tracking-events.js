import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onArticleSavePress",
        getAttrs: ({ articleId, savedArticles }) => ({
          articleId,
          isSaved: !savedArticles[articleId]
        }),
        trackingName: "ArticleSave/Unsave"
      }
    ]
  });
