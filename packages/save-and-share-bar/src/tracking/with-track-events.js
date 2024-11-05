import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onSaveToMyArticles",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline
        }),
        trackingName: "ArticleSaveToMyArticles"
      },
      {
        actionName: "Pressed",
        eventName: "onShareEmail",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline
        }),
        trackingName: "ArticleShareUrlByEmail"
      },
      {
        actionName: "Pressed",
        eventName: "onCopyLink",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline
        }),
        trackingName: "ArticleCopyLink"
      },
      {
        actionName: "Pressed",
        eventName: "onShareOnFB",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline
        }),
        trackingName: "ArticleShareOnFacebook"
      },
      {
        actionName: "Pressed",
        eventName: "onShareOnTwitter",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline
        }),
        trackingName: "ArticleShareOnTwitter"
      },
      {
        actionName: "Pressed",
        eventName: "onShareBarExpend",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline,
          event_social_action: "share start"
        }),
        trackingName: "ArticleShareOnExpend"
      },
      {
        actionName: "Pressed",
        eventName: "onShareBarClose",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline,
          event_social_action: "share start"
        }),
        trackingName: "ArticleShareOnClose"
      }
    ]
  });
