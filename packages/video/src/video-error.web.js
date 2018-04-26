import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./styles/video-error.styles";

const VideoError = ({ width, height }) => (
  <View style={[styles.background, { width, height }]}>
    <Text style={styles.heading}>Video unable to play</Text>
    <Text style={styles.body}>
      Please check your network connection and try refreshing the page. If that
      doesn&apos;t work, please try again later
    </Text>
  </View>
);

VideoError.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
