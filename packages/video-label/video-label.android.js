import React from "react";
import { View, Text } from "react-native";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";

// apply transformations to add uppercase and letter spacing.
// letterSpacing CSS prop does not work on android:
// https://github.com/facebook/react-native/pull/13199
const beautifyTitle = title =>
  title
    .toUpperCase()
    .split("")
    .join("\u200A");

const VideoLabel = ({ title, color }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <IconVideo height={styles.title.fontSize} fillColor={color} />
    <Text style={[styles.title, { color, marginLeft: 5 }]}>{beautifyTitle("VIDEO")}</Text>
    {title ? <Text style={[styles.title, { color, marginLeft: 3 }]}>|</Text> : null}
    {title ? (
      <Text style={[styles.title, { color, paddingLeft: 3 }]}>{beautifyTitle(title)}</Text>
    ): null}
  </View>
);

VideoLabel.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black"
};

export default VideoLabel;
