import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";

import { withTrackRender, withTrackingContext } from "./tracking";

const storybookReporter = action("analytics-event");

storiesOf("Tracking", module).add("Render tracking", () => {
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
  Box.propTypes = { color: PropTypes.string.isRequired };

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
});
