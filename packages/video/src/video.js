import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Image from "@times-components/image";
import Touchable from "./touchable";
import PlayIcon from "./play-icon.native";
import { propTypes, defaultProps } from "./video-prop-types";
import SkySportsBanner from "./sky-sports-banner";
import styles from "./styles";

const Video = ({
  accountId,
  height,
  onVideoPress,
  policyKey,
  poster,
  skySports,
  videoId,
  width
}) => (
  <Touchable
    accessibilityLabel="Video Splash"
    onPress={e => {
      onVideoPress(e, {
        accountId,
        policyKey,
        videoId
      });
    }}
    testID="splash-component"
  >
    <View style={[{ height, width }]}>
      {skySports && <SkySportsBanner />}
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
