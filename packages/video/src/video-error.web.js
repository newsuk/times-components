/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Button from "@times-components/button";
import Image from "@times-components/image";
import styles, { retryButtonStyles } from "./styles";

const VideoError = ({ height, width, poster }) => (
  <View style={[styles.background, { width, height }]}>
    <View style={styles.posterContainer}>
      <Image
        aspectRatio={width / height}
        style={styles.posterImage}
        uri={poster.uri}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.heading}>Something&apos;s gone wrong</Text>
      <Text style={styles.body}>
        Please check your network connection and retry to try again
      </Text>
      <Button
        onPress={() => {
          window.location.reload();
        }}
        style={retryButtonStyles}
        title="Retry"
      />
    </View>
  </View>
);

VideoError.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  poster: PropTypes.shape({ uri: PropTypes.string.isRequired }).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
