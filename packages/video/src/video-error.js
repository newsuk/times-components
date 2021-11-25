import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./styles";

const VideoError = ({ height, width }) => (
  <View
    style={[
      styles.background,
      {
        height,
        width
      }
    ]}
  >
    <Text style={styles.heading}>Video unable to play</Text>
    <Text style={styles.body}>
      Please check your network connection and try refreshing the page. If that
      doesn&apos;t work, please try again later
    </Text>
  </View>
);

VideoError.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
