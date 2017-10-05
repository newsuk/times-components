import React from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import {
  withTrackRender,
  withTrackingContext,
  withTrackEvents
} from "./tracking";

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
  <View style={[styles.box, { backgroundColor: props.color }]}>
    <Button onPress={() => props.onPress("button 1")} title="Press me" />
    <Button
      color="limegreen"
      onPress={() => props.onPress("button 2")}
      title="Or me"
    />
  </View>
);
Box.propTypes = {
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

storiesOf("Tracking", module)
  .add("Render tracking", () => {
    const BoxWithTrackingAndContext = withTrackingContext(
      withTrackRender(Box, {
        trackingName: "ColoredBox",
        getAttrs: props => ({ color: props.color })
      }),
      { trackingObject: "TrackRenderStory" }
    );

    return (
      <BoxWithTrackingAndContext
        analyticsStream={storybookReporter}
        color="red"
      />
    );
  })
  .add("Event tracking", () => {
    const BoxWithPressTrackingAndContext = withTrackingContext(
      withTrackEvents(Box, {
        trackingName: "ColoredBox",
        getAttrs: (props, eventArgs) => ({ button: eventArgs[0] }),
        analyticsEvents: [{ eventName: "onPress", actionName: "Pressed" }]
      }),
      { trackingObject: "TrackRenderStory" }
    );

    return (
      <BoxWithPressTrackingAndContext
        analyticsStream={storybookReporter}
        color="red"
      />
    );
  });
