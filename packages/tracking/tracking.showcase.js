import React from "react";
import PropTypes from "prop-types";
import { Button, View } from "react-native";
import storybookReporter from "@times-components/tealium-utils";
import {
  withTrackingContext,
  withTrackEvents,
  withTrackScrollDepth
} from "./src/tracking";
import Box, { boxStyles } from "./storybook-components/box";
import Boxes from "./storybook-components/boxes";

const BoxWithButtons = ({ color, onPress }) => (
  <View style={[boxStyles.box, { backgroundColor: color }]}>
    <Button onPress={() => onPress("button 1")} title="Press me" />
    <Button
      color="limegreen"
      onPress={() => onPress("button 2")}
      title="Or me"
    />
  </View>
);
BoxWithButtons.propTypes = {
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const BoxWithTrackingContext = withTrackingContext(Box, {
  getAttrs: props => ({
    color: props.color
  }),
  trackingObjectName: "TrackRenderStory"
});

const BoxWithPressTrackingAndContext = withTrackingContext(
  withTrackEvents(BoxWithButtons, {
    analyticsEvents: [
      {
        actionName: "Pressed",
        eventName: "onPress",
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
        <BoxWithPressTrackingAndContext
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
