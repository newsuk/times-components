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
      },
      {
        actionName: "Pressed",
        eventName: "onShareOnFB",
        getAttrs: ({ articleUrl }) => ({
          articleUrl,
          type: "fb"
        }),
        trackingName: "ArticleShareOnFacebook"
      },
      {
        actionName: "Pressed",
        eventName: "onShareOnTwitter",
        getAttrs: ({ articleUrl }) => ({
          articleUrl,
          type: "twitter"
        }),
        trackingName: "ArticleShareOnTwitter"
      }
    ]
  });
