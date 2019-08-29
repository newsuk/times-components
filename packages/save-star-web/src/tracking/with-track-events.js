import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onSave",
        getAttrs: ({ articleId, savedStatus }) => ({
          articleId,
          savedStatus: !savedStatus
        }),
        trackingName: "ArticleSaveToMyArticles"
      }
    ]
  });
