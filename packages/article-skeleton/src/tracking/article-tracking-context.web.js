import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";
import { getRegistrationType, getSharedStatus } from "../data-helper";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ data, pageSection, referralUrl = "" }) => ({
      articleId: get(data, "id", ""),
      article_topic_tags: get(data, "topics", []).map(topic => topic.name),
      bylines: get(
        data,
        "bylines[0].byline[0].children[0].attributes.value",
        ""
      ),
      headline: get(data, "headline", ""),
      label: get(data, "label", ""),
      pageName: `${get(data, "slug", "")}-${get(data, "shortIdentifier", "")}`,
      publishedTime: get(data, "publishedTime", ""),
      parent_site: get(data, "publicationName", ""),
      referralUrl,
      section: pageSection || get(data, "section", ""),
      template: get(data, "template", "Default"),
      registrationType: getRegistrationType(),
      shared: getSharedStatus()
    }),
    trackingObjectName: "Article"
  });
