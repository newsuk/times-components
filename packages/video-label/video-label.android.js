import React from "react";
import { Text } from "react-native";
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
  <Text style={[styles.title, { color }]}>{beautifyTitle(title)}</Text>
);

VideoLabel.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black"
};

export default VideoLabel;
