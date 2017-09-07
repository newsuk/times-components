import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import BrightcoveVideo from "@times-components/brightcove-video";
import Splash from "./splash";
import TapToLaunch from "./tap-to-launch";

const BrightcoveVideoLauncher = props =>
  <TapToLaunch>
    {isLaunched =>
      <View style={{ width: props.width, height: props.height }}>
        {isLaunched ? <BrightcoveVideo {...props} /> : <Splash {...props} />}
      </View>}
  </TapToLaunch>;

BrightcoveVideoLauncher.propTypes = Object.assign(
  {},
  Splash.propTypes,
  BrightcoveVideo.propTypes
);

BrightcoveVideoLauncher.defaultProps = Object.assign(
  {},
  Splash.defaultProps,
  BrightcoveVideo.defaultProps
);

BrightcoveVideoLauncher.defaultProps.autoplay = true;

export default BrightcoveVideoLauncher;
