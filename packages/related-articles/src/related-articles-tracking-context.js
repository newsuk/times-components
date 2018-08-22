import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";
import {
  standardRoles,
  leadAndTwoRoles,
  opinionAndTwoRoles
} from "@times-components/slice";
import getHeadline from "./utils";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "RelatedArticles",
    getAttrs: ({ slice }) => {
      const { items, lead, opinion, sliceName, support1, support2 } = slice;
      if (!sliceName) return null;
      const supports = [support1, support2];

      const supportsTracking = roles =>
        supports
          .filter(support => support !== undefined)
          .map(({ article }, index) => {
            const {
              byline,
              headline,
              id,
              publishedTime,
              shortHeadline
            } = article;
            return {
              id,
              byline: get(byline, "[0].children[0].attributes.value", ""),
              headline: getHeadline(headline, shortHeadline),
              publishedTime,
              role: roles[index + 1]
            };
          });

      const standardTracking = () =>
        items.map(({ article }, index) => {
          const {
            byline,
            headline,
            id,
            publishedTime,
            shortHeadline
          } = article;
          return {
            id,
            byline: get(byline, "[0].children[0].attributes.value", ""),
            headline: getHeadline(headline, shortHeadline),
            publishedTime,
            role: standardRoles[index]
          };
        });

      const leadOneAndTwoTracking = () => {
        const { article } = lead;
        const { byline, headline, id, publishedTime, shortHeadline } = article;
        const leadOneAndTwoTrackingObject = {
          id,
          byline: get(byline, "[0].children[0].attributes.value", ""),
          headline: getHeadline(headline, shortHeadline),
          publishedTime,
          role: leadAndTwoRoles[0]
        };

        const supportsTrackingObjects = supportsTracking(leadAndTwoRoles);

        return [leadOneAndTwoTrackingObject, ...supportsTrackingObjects];
      };

      const opinionOneAndTwoTracking = () => {
        const { article } = opinion;
        const { byline, headline, id, publishedTime, shortHeadline } = article;
        const opinionOneAndTwoTrackingObject = {
          id,
          byline: get(byline, "[0].children[0].attributes.value", ""),
          headline: getHeadline(headline, shortHeadline),
          publishedTime,
          role: opinionAndTwoRoles[0]
        };

        const supportsTrackingObjects = supportsTracking(opinionAndTwoRoles);

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
    }
  });
