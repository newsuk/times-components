import React from "react";
import { Text, View } from "react-native";
import { VideoIcon } from "@times-components/icons";
import PropTypes from "prop-types";
import styles from "./style";

const VideoLabel = ({ title, color }) => (
  <View>
    <VideoIcon
      width={styles.title.fontSize}
      height={styles.title.fontSize}
      fillColor={color}
    />
    <Text style={[styles.title, { color }]}>Video</Text>
    {title && <Text style={[styles.title, { color }]}> | {Title}</Text>}
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
