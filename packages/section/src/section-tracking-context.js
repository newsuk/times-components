import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ section }) => ({
      sectionName: section && section.title
    }),
    trackingObjectName: "Section"
  });
