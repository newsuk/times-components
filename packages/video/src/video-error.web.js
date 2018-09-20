/* eslint-env browser */
import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Button from "@times-components/button";
import Image from "@times-components/image";
import styles, { retryButtonStyles } from "./styles";

const VideoError = ({ height, width, poster }) => {
  const renderPosterImage = () => {
    if (!poster) return null;
    return (
      <Image
        aspectRatio={width / height}
        style={styles.posterImage}
        uri={poster.uri}
      />
    );
  };

  const renderRetryButton = () => {
    if (typeof window === "undefined") return null;
    return (
      <Button
        onPress={() => {
          window.location.reload();
        }}
        style={retryButtonStyles}
        title="Retry"
      />
    );
  };

  return (
    <View style={[styles.background, { width, height }]}>
      <View style={styles.posterContainer}>{renderPosterImage()}</View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Something&apos;s gone wrong</Text>
        <Text style={styles.body}>
          Please check your network connection and try again
        </Text>
        {renderRetryButton()}
      </View>
    </View>
  );
};

VideoError.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  poster: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

VideoError.defaultProps = {
  poster: ""
};

export default VideoError;
