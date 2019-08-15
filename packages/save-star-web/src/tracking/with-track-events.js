import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onSaveButtonPress",
        getAttrs: ({ articleId, articleHeadline, savedStatus }) => ({
          articleId,
          articleHeadline,
          savedStatus: !savedStatus
        }),
        trackingName: "ArticleSaveToMyArticles"
      }
    ]
  });
