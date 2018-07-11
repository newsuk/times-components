import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Image from "@times-components/image";
import Touchable from "./touchable";
import PlayIcon from "./play-icon.native";
import { propTypes, defaultProps } from "./video-prop-types";
import styles from "./styles";

const Video = ({
  accountId,
  height,
  onVideoPress,
  policyKey,
  poster,
  videoId,
  width
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
    <View style={{ height, width }}>
      {poster ? (
        <Image
          style={{
            height,
            width
          }}
          uri={poster.uri}
        />
      ) : (
        <View
          style={{
            backgroundColor: "black",
            height,
            width
          }}
        />
      )}
      <View style={[styles.overlay, { height, width }]}>
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
