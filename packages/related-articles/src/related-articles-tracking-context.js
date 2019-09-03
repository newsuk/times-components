import { withTrackingContext } from "@times-components/tracking";
import getHeadline from "./utils";
import {
  standardRoles,
  opinionOneAndTwoRoles,
  leadOneAndTwoRoles
} from "./roles";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ slice }) => {
      const { items, lead, opinion, sliceName, support1, support2 } = slice;
      if (!sliceName) return null;
      const supports = [support1, support2];

      const supportsTracking = roles =>
        supports
          .filter(support => support !== undefined)
          .map(({ article }, index) => {
            const { headline, id, shortHeadline } = article;
            return {
              headline: getHeadline(headline, shortHeadline),
              id,
              role: roles[index + 1]
            };
          });

      const standardTracking = () =>
        items.map(({ article }, index) => {
          const { headline, id, shortHeadline } = article;
          return {
            headline: getHeadline(headline, shortHeadline),
            id,
            role: standardRoles[index]
          };
        });

      const leadOneAndTwoTracking = () => {
        const { article } = lead;
        const { headline, id, shortHeadline } = article;
        const leadOneAndTwoTrackingObject = {
          headline: getHeadline(headline, shortHeadline),
          id,
          role: leadOneAndTwoRoles[0]
        };

        const supportsTrackingObjects = supportsTracking(leadOneAndTwoRoles);

        return [leadOneAndTwoTrackingObject, ...supportsTrackingObjects];
      };

      const opinionOneAndTwoTracking = () => {
        const { article } = opinion;
        const { headline, id, shortHeadline } = article;
        const opinionOneAndTwoTrackingObject = {
          headline: getHeadline(headline, shortHeadline),
          id,
          role: opinionOneAndTwoRoles[0]
        };

        const supportsTrackingObjects = supportsTracking(opinionOneAndTwoRoles);

        return [opinionOneAndTwoTrackingObject, ...supportsTrackingObjects];
      };

      const trackingObject = {
        articles: [],
        template: sliceName
      };

      if (!items && !lead && !opinion) return trackingObject;

      switch (sliceName) {
        case "StandardSlice":
        default:
          trackingObject.articles = standardTracking();
          break;
        case "LeadOneAndTwoSlice":
          trackingObject.articles = leadOneAndTwoTracking();
          break;
        case "OpinionOneAndTwoSlice":
          trackingObject.articles = opinionOneAndTwoTracking();
      }

      return trackingObject;
    },
    trackingObjectName: "RelatedArticles"
  });
