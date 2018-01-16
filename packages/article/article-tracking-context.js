import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    trackingObject: "Article",
    isDataReady: ({ isLoading }) => !isLoading,
    getAttrs: ({ article } = {}) => ({
      byline: get(article, "byline[0].children[0].attributes.value", ""),
      headline: get(article, "headline", ""),
      publishedTime: get(article, "publishedTime", "")
    })
  });
