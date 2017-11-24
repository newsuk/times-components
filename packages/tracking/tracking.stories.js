import React from "react";
import PropTypes from "prop-types";
import { Button, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import {
  withTrackingContext,
  withTrackEvents,
  withTrackChildViews
} from "./tracking";
import storybookReporter from "../../storybook/storybook-tealium-reporter";
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
  trackingObject: "TrackRenderStory",
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
  { trackingObject: "TrackRenderStory" }
);

storiesOf("Tracking", module)
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
  .add("Child view tracking", () => {
    const boxes = [...Array(50).keys()].map(i => ({
      id: `box-${i + 1}`,
      color: i % 2 === 0 ? "green" : "blue"
    }));
    const BoxesWithTrackingContext = withTrackingContext(
      withTrackChildViews(Boxes, {
        childIdPropKey: "id",
        getAttrs: ({ id, index }) => ({ id, index })
      }),
      { trackingObject: "Story" }
    );
    return (
      <BoxesWithTrackingContext
        onViewed={() => {}}
        boxes={boxes}
        analyticsStream={storybookReporter}
      />
    );
  });
