import { withTrackEvents } from "@times-components/tracking";

const withSliceTrackingEvents = Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ index, length, slice }) => ({
          scrollDepth: {
            itemNumber: index + 1,
            total: length
          },
          sliceName: slice.name
        }),
        trackingObjectName: "Slice"
      }
    ]
  });

export default Component => withSliceTrackingEvents(Component);
