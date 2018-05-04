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
    onPress={e => {
      onVideoPress(e, {
        accountId,
        policyKey,
        videoId
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
