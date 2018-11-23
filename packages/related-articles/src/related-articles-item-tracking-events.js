import { withTrackEvents } from "@times-components/tracking";
import getHeadline from "./utils";

export default Component =>
  withTrackEvents(Component, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
        getAttrs: ({ article: { headline, id, shortHeadline } }) => ({
          articleHeadline: shortHeadline || headline,
          articleId: id
        })
      }
    ]
  });
