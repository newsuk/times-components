import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";
import {
  standardRoles,
  leadOneAndTwoRoles,
  opinionOneAndTwoRoles
} from "@times-components/slice-layout";
import getHeadline from "./utils";

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
            const {
              byline,
              headline,
              id,
              publishedTime,
              shortHeadline
            } = article;
            return {
              byline: get(byline, "[0].children[0].attributes.value", ""),
              headline: getHeadline(headline, shortHeadline),
              id,
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
            byline: get(byline, "[0].children[0].attributes.value", ""),
            headline: getHeadline(headline, shortHeadline),
            id,
            publishedTime,
            role: standardRoles[index]
          };
        });

      const leadOneAndTwoTracking = () => {
        const { article } = lead;
        const { byline, headline, id, publishedTime, shortHeadline } = article;
        const leadOneAndTwoTrackingObject = {
          byline: get(byline, "[0].children[0].attributes.value", ""),
          headline: getHeadline(headline, shortHeadline),
          id,
          publishedTime,
          role: leadOneAndTwoRoles[0]
        };

        const supportsTrackingObjects = supportsTracking(leadOneAndTwoRoles);

        return [leadOneAndTwoTrackingObject, ...supportsTrackingObjects];
      };

      const opinionOneAndTwoTracking = () => {
        const { article } = opinion;
        const { byline, headline, id, publishedTime, shortHeadline } = article;
        const opinionOneAndTwoTrackingObject = {
          byline: get(byline, "[0].children[0].attributes.value", ""),
          headline: getHeadline(headline, shortHeadline),
          id,
          publishedTime,
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
