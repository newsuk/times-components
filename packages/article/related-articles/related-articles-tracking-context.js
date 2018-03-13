import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";
import { standardRoles, leadAndTwoRoles } from "@times-components/slice";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "RelatedArticles",
    getAttrs: ({ template, articles }) => ({
      template,
      articles: articles.map(
        ({ id, headline, publishedTime, byline }, index) => {
          const getRole = () => {
            switch (template) {
              case "DEFAULT":
              default:
                return standardRoles[index];
              case "LEAD_AND_TWO":
                return leadAndTwoRoles[index];
            }
          };

          return {
            id,
            byline: get(byline, "[0].children[0].attributes.value", ""),
            headline,
            publishedTime,
            role: getRole()
          };
        }
      )
    })
  });
