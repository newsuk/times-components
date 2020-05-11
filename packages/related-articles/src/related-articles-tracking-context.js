import { withTrackingContext } from "@times-components/tracking";
import getHeadline from "./utils";
import standardRoles from "./roles";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ slice }) => {
      const { items, sliceName } = slice;
      if (!sliceName) return null;

      const standardTracking = () =>
        items.map(({ article }, index) => {
          const { headline, id, shortHeadline } = article;
          return {
            headline: getHeadline(headline, shortHeadline),
            id,
            role: standardRoles[index]
          };
        });

      const trackingObject = {
        articles: [],
        template: sliceName
      };

      if (!items) return trackingObject;

      trackingObject.articles = standardTracking();

      return trackingObject;
    },
    trackingObjectName: "Article"
  });
