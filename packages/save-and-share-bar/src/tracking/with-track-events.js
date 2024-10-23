import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "navigation",
        eventName: "onSaveToMyArticles",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline,
          event_navigation_name: "add to my articles",
          event_navigation_browsing_method: "click"
        }),
        trackingName: "ArticleSaveToMyArticles"
      },
      {
        actionName: "navigation",
        eventName: "onRemoveFromMyArticles",
        getAttrs: ({ articleId, articleHeadline }) => ({
          articleId,
          articleHeadline,
          event_navigation_name: "remove from my articles",
          event_navigation_browsing_method: "click"
        }),
        trackingName: "ArticleRemoveFromMyArticles"
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
      }
    ]
  });
