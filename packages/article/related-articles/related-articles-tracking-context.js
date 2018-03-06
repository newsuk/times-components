import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";
import role from "@times-components/slice/styles/role-map";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "RelatedArticles",
    getAttrs: ({ template, articles }) => ({
      template,
      articles: articles.map(
        ({ id, headline, publishedTime, byline }, index) => ({
          id,
          byline: get(byline, "[0].children[0].attributes.value", ""),
          headline,
          publishedTime,
          role: role(template, index)
        })
      )
    })
  });
