import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "RelatedArticles",
    isDataReady: ({ isLoading }) => !isLoading,
    getAttrs: ({ template, articles }) => ({
      template,
      articles: articles.map(({ id, headline, publishedTime, byline }) => ({
        id,
        byline: get(byline, "[0].children[0].attributes.value", ""),
        headline,
        publishedTime
      }))
    })
  });
