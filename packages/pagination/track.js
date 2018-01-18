import { withTrackEvents } from "@times-components/tracking";

export default view =>
  withTrackEvents(view, {
    analyticsEvents: [
      {
        eventName: "onNext",
        actionName: "Pressed",
        getAttrs: (props, [, destinationPage]) => ({
          destinationPage,
          direction: "next"
        })
      },
      {
        eventName: "onPrev",
        actionName: "Pressed",
        getAttrs: (props, [, destinationPage]) => ({
          destinationPage,
          direction: "previous"
        })
      }
    ]
  });
