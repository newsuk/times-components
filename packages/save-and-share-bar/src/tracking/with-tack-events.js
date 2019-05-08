import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onSaveToMyArticles",
        getAttrs: ({ articleUrl }) => ({
          articleUrl
        }),
        trackingName: "ArticleSaveToMyArticles"
      },
      {
        actionName: "Pressed",
        eventName: "onShareOnEmail",
        getAttrs: ({ articleUrl }) => ({
          articleUrl
        }),
        trackingName: "ArticleShareOnEmail"
      },
      {
        actionName: "Pressed",
        eventName: "onCopyLink",
        getAttrs: ({ articleUrl }) => ({
          articleUrl
        }),
        trackingName: "ArticleCopyLink"
      }
    ]
  });
