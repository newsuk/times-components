import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Image from "@times-components/image";

import Touchable from "./touchable";
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
  <Touchable
    onPress={e => {
      onVideoPress(e, {
        brightcoveAccountId,
        brightcovePolicyKey,
        brightcoveVideoId
      });
    }}
    testID="splash-component"
    accessibilityLabel="splash-component"
  >
    <View style={{ width, height }}>
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
    </View>
  </Touchable>
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
