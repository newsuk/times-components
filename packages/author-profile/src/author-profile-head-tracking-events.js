import { withTrackEvents } from "@times-components/tracking";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onTwitterLinkPress",
        trackingName: "TwitterLink",
        getAttrs: (props, eventArgs) => ({
          twitterHandle: props.twitter,
          url: eventArgs[1] && eventArgs[1].url
        })
      }
    ]
  });
