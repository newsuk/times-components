import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "Article",
    getAttrs: ({ article, pageSection }) => ({
      articleId: get(article, "id", ""),
      byline: get(article, "byline[0].children[0].attributes.value", ""),
      headline: get(article, "headline", ""),
      pageName: `${get(article, "slug", "")}-${get(
        article,
        "shortIdentifier",
        ""
      )}`,
      template: get(article, "template", "Default"),
      label: get(article, "label", ""),
      publishedTime: get(article, "publishedTime", ""),
      section: pageSection || get(article, "section", ""),
      topics: get(article, "topics")
    })
  });
