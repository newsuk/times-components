import React from "react";
import { View, Text } from "react-native";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";
import beautifyTitle from "./beautify-title";

const VideoLabel = ({ color, title }) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <IconVideo fillColour={color} height={8} />
    </View>
    <Text style={[styles.title, { color }]}>
      {beautifyTitle(title || "VIDEO")}
    </Text>
  </View>
);

VideoLabel.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black",
  title: ""
};

export default VideoLabel;
