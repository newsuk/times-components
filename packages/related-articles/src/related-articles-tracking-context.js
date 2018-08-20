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
    getAttrs: ({ relatedArticleSlice }) => {
      const {
        items,
        lead,
        opinion,
        sliceName,
        support1,
        support2
      } = relatedArticleSlice;
      if (!sliceName) return null;
      const supports = [support1, support2];

      const supportsTracking = roles =>
        supports
          .filter(support => support !== undefined)
          .map(
            (
              { byline, headline, id, publishedTime, shortHeadline },
              index
            ) => ({
              id,
              byline: get(byline, "[0].children[0].attributes.value", ""),
              headline: getHeadline(headline, shortHeadline),
              publishedTime,
              role: roles[index + 1]
            })
          );

      const standardTracking = () =>
        items.map(
          ({ byline, headline, id, publishedTime, shortHeadline }, index) => ({
            id,
            byline: get(byline, "[0].children[0].attributes.value", ""),
            headline: getHeadline(headline, shortHeadline),
            publishedTime,
            role: standardRoles[index]
          })
        );

      const leadOneAndTwoTracking = () => {
        const { byline, headline, id, publishedTime, shortHeadline } = lead;
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
        const { byline, headline, id, publishedTime, shortHeadline } = opinion;
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

      switch (sliceName) {
        case "StandardSlice":
        default:
          return standardTracking();
        case "LeadOneAndTwoSlice":
          return leadOneAndTwoTracking();
        case "OpinionOneAndTwoSlice":
          return opinionOneAndTwoTracking();
      }
    }
  });
