import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Image from "@times-components/image";

import Touchable from "./touchable";
import PlayIcon from "./play-icon";
import { propTypes, defaultProps } from "./video.proptypes";
import styles from "./styles/video.styles";

const Video = ({
  poster,
  width,
  height,
  onVideoPress,
  accountId,
  policyKey,
  videoId
}) => (
  <Touchable
    accessibilityLabel="splash-component"
    onPress={e => {
      onVideoPress(e, {
        accountId,
        policyKey,
        videoId
      });
    }}
    testID="splash-component"
  >
    <View style={{ width, height }}>
      {poster ? (
        <Image
          style={{
            width,
            height
          }}
          uri={poster.uri}
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
