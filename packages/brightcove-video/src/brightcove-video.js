import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { addMissingProtocol } from "@times-components/utils";

import PlayIcon from "./play-icon";
import { propTypes, defaultProps } from "./brightcove-video.proptypes";

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

const addMissingProtocolToPoster = poster => ({
  uri: addMissingProtocol(poster.uri)
});

const BrightcoveVideo = ({
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
        source={addMissingProtocolToPoster(poster)}
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

BrightcoveVideo.defaultProps = {
  ...defaultProps,
  onVideoPress: () => {}
};
BrightcoveVideo.propTypes = {
  ...propTypes,
  onVideoPress: PropTypes.func
};

export default BrightcoveVideo;
