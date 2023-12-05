import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import storybookReporter from "@times-components/tealium-utils";
import {
  withTrackingContext,
  withTrackEvents,
  withTrackScrollDepth
} from "./src/tracking";
import Box, { boxStyles } from "./storybook-components/box";
import Boxes from "./storybook-components/boxes";

const BoxWithButtons = ({ color, onClick }) => (
  <TcView style={{ ...boxStyles.box, backgroundColor: color }}>
    <button type="button" onClick={() => onClick("button 1")} title="Press me">
      Press me
    </button>
    <button
      type="button"
      style={{ backgroundColor: "LimeGreen" }}
      onClick={() => onClick("button 2")}
      title="Or me"
    >
      Or me
    </button>
  </TcView>
);
BoxWithButtons.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const BoxWithTrackingContext = withTrackingContext(Box, {
  getAttrs: props => ({
    color: props.color
  }),
  trackingObjectName: "TrackRenderStory"
});

const BoxWithClickTrackingAndContext = withTrackingContext(
  withTrackEvents(BoxWithButtons, {
    analyticsEvents: [
      {
        actionName: "Clicked",
        eventName: "onClick",
        getAttrs: (props, eventArgs) => ({
          button: eventArgs[0]
        }),
        trackingName: "ColoredBox"
      }
    ]
  }),
  { trackingObjectName: "TrackRenderStory" }
);

const BoxesWithTrackingContext = withTrackingContext(
  withTrackScrollDepth(Boxes, {
    getAttrs: props => ({
      id: props.elementId
    }),
    trackingName: "ColoredBox"
  }),
  { trackingObjectName: "Story" }
);

export default {
  children: [
    {
      component: () => (
        <BoxWithTrackingContext
          analyticsStream={storybookReporter}
          color="red"
        />
      ),
      name: "Page tracking",
      type: "story"
    },
    {
      component: () => (
        <BoxWithClickTrackingAndContext
          analyticsStream={storybookReporter}
          color="red"
          onPress={() => {}}
        />
      ),
      name: "Event tracking",
      type: "story"
    },
    {
      component: () => {
        const boxes = [...Array(50).keys()].map(i => ({
          color: i % 2 === 0 ? "green" : "blue",
          elementId: `box-${i + 1}`
        }));
        return (
          <BoxesWithTrackingContext
            analyticsStream={storybookReporter}
            boxes={boxes}
            onViewed={() => {}}
          />
        );
      },
      name: "Scroll depth tracking",
      type: "story"
    }
  ],
  name: "Helpers/Tracking"
};
