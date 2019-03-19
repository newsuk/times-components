import React from "react";
import { View, Text } from "react-native";
import { IconVideo } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";

const VideoLabel = ({ color, title }) => {
  const label = title ? title.toUpperCase() : "VIDEO";
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconVideo fillColour={color} height={9} />
      </View>
      <Text accessibilityLabel={`${label}.`} style={[styles.title, { color }]}>
        {label}
      </Text>
    </View>
  );
};

VideoLabel.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string
};

VideoLabel.defaultProps = {
  color: "black",
  title: ""
};

export default VideoLabel;
