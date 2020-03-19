import get from "lodash.get";
import { DateTime } from "luxon";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ section, publicationName }) => {
      const { slices } = section;
      const firstSlice = slices[0];
      const nonName = Object.keys(firstSlice).filter(n => n !== "name")[0];
      const { article: data } = firstSlice[nonName];
      const published = DateTime.fromJSDate(
        new Date(get(data, "publishedTime", ""))
      );
      const current = DateTime.local();
      const diff = current.diff(published, "days");
      const { days } = diff.values || { days: 0.0 };
      const editionType = days > 1.0 ? "past 6 days" : "current edition";
      return {
        sectionName: section && section.title,
        edition_type: editionType,
        past_edition_date:
          editionType === "past 6 days" ? get(data, "publishedTime", "") : null,
        parent_site: publicationName || ""
      };
    },
    trackingObjectName: "Section"
  });
