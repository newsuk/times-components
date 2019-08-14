import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onSaveButtonPress",
        getAttrs: props => {
          const { articleId, articleHeadline, savedStatus } = props;
          return {
            articleId,
            articleHeadline,
            savedStatus: !savedStatus
          };
        },
        trackingName: "ArticleSaveToMyArticles"
      }
    ]
  });
