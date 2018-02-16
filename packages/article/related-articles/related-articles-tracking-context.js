import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "RelatedArticles",
    getAttrs: ({ template, articles }) => ({
      template,
      isDataReady: ({ isLoading }) => !isLoading,
      articles: articles.map(
        ({ id, headline, publishedTime, byline }, index) => ({
          id,
          byline: get(byline, "[0].children[0].attributes.value", ""),
          headline: headline,
          publishedTime,
          position: index
        })
      )
    })
  });
