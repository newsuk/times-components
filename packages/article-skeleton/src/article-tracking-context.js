import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ data, pageSection, referralUrl = "" }) => ({
      articleId: get(data, "id", ""),
      byline: get(data, "byline[0].children[0].attributes.value", ""),
      headline: get(data, "headline", ""),
      label: get(data, "label", ""),
      pageName: `${get(data, "slug", "")}-${get(data, "shortIdentifier", "")}`,
      publishedTime: get(data, "publishedTime", ""),
      referralUrl,
      section: pageSection || get(data, "section", ""),
      template: get(data, "template", "Default"),
      topics: (get(data, "topics", []) || []).map(topic => topic.name).join(",")
    }),
    trackingObjectName: "Article"
  });
