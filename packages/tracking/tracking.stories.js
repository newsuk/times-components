import React from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { withTrackingContext, withTrackEvents } from "./tracking";

const storybookReporter = action("analytics-event");

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    height: 200,
    width: 200
  }
});
const Box = props => (
  <View style={[styles.box, { backgroundColor: props.color }]} />
);
Box.propTypes = {
  color: PropTypes.string.isRequired
};

const BoxWithButtons = props => (
  <View style={[styles.box, { backgroundColor: props.color }]}>
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
  ));
