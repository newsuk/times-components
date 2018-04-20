import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Image from "@times-components/image";

import PlayIcon from "./play-icon";
import { propTypes, defaultProps } from "./video.proptypes";

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const Video = ({
  poster,
  width,
  height,
  onVideoPress,
  brightcoveAccountId,
  brightcovePolicyKey,
  brightcoveVideoId
}) => (
  <TouchableOpacity
    style={{ width, height }}
    testID="splash-component"
    accessibilityLabel="splash-component"
    onPress={e => {
      onVideoPress(e, {
        brightcoveAccountId,
        brightcovePolicyKey,
        brightcoveVideoId
      });
    }}
  >
    {poster ? (
      <Image
        uri={poster.uri}
        style={{
          width,
          height
        }}
      />
    ) : (
      <View
        style={{
          width,
          height,
          backgroundColor: "black"
        }}
      />
    )}
    <View style={[styles.overlay, { width, height }]}>
      <PlayIcon />
    </View>
  </TouchableOpacity>
);

Video.defaultProps = {
  ...defaultProps,
  onVideoPress: () => {}
};
Video.propTypes = {
  ...propTypes,
  onVideoPress: PropTypes.func
};

export default Video;
