import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import Player from "./brightcove-player";
import Splash from "./splash";
import TapToLaunch from "./tap-to-launch";

const BrightcoveVideo = props =>
  <TapToLaunch>
    {isLaunched =>
      <View style={{ width: props.width, height: props.height }}>
        {isLaunched ? <Player {...props} /> : <Splash {...props} />}
      </View>}
  </TapToLaunch>;

BrightcoveVideo.propTypes = Object.assign(
  {},
  Splash.propTypes,
  Player.propTypes
);

BrightcoveVideo.defaultProps = Object.assign(
  {},
  Splash.defaultProps,
  Player.defaultProps
);

BrightcoveVideo.defaultProps.autoplay = true;

export default BrightcoveVideo;
