import React from "react";
import PropTypes from "prop-types";
import { Button, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import storybookReporter from "@times-components/tealium/storybook";
import { checkA11y } from "@storybook/addon-a11y";
import {
  withTrackingContext,
  withTrackEvents,
  withTrackScrollDepth
} from "./tracking";
import Box, { boxStyles } from "./storybook-components/box";
import Boxes from "./storybook-components/boxes";

const BoxWithButtons = props => (
  <View style={[boxStyles.box, { backgroundColor: props.color }]}>
    <Button onPress={() => props.onPress("button 1")} title="Press me" />
    <Button
      color="limegreen"
      onPress={() => props.onPress("button 2")}
      title="Or me"
    />
  </View>
);
BoxWithButtons.propTypes = {
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const BoxWithTrackingContext = withTrackingContext(Box, {
  trackingObjectName: "TrackRenderStory",
  getAttrs: props => ({ color: props.color })
});

const BoxWithPressTrackingAndContext = withTrackingContext(
  withTrackEvents(BoxWithButtons, {
    analyticsEvents: [
      {
        eventName: "onPress",
        actionName: "Pressed",
        trackingName: "ColoredBox",
        getAttrs: (props, eventArgs) => ({ button: eventArgs[0] })
      }
    ]
  }),
  { trackingObjectName: "TrackRenderStory" }
);

const BoxesWithTrackingContext = withTrackingContext(
  withTrackScrollDepth(Boxes, {
    getAttrs: props => ({
      id: props.elementId
    })
  }),
  { trackingObjectName: "Story" }
);

storiesOf("Helpers/Tracking", module)
  .addDecorator(checkA11y)
  .add("Page tracking", () => (
    <BoxWithTrackingContext analyticsStream={storybookReporter} color="red" />
  ))
  .add("Event tracking", () => (
    <BoxWithPressTrackingAndContext
      analyticsStream={storybookReporter}
      color="red"
      onPress={() => {}}
    />
  ))
  .add("Scroll depth tracking", () => {
    const boxes = [...Array(50).keys()].map(i => ({
      elementId: `box-${i + 1}`,
      color: i % 2 === 0 ? "green" : "blue"
    }));
    return (
      <BoxesWithTrackingContext
        onViewed={() => {}}
        boxes={boxes}
        analyticsStream={storybookReporter}
      />
    );
  });
