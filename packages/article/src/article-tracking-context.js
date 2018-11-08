import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ article, pageSection }) => ({
      articleId: get(article, "id", ""),
      byline: get(article, "byline[0].children[0].attributes.value", ""),
      headline: get(article, "headline", ""),
      label: get(article, "label", ""),
      pageName: `${get(article, "slug", "")}-${get(
        article,
        "shortIdentifier",
        ""
      )}`,
      publishedTime: get(article, "publishedTime", ""),
      section: pageSection || get(article, "section", ""),
      template: get(article, "template", "Default"),
      topics: get(article, "topics")
    }),
    trackingObjectName: "Article"
  });
