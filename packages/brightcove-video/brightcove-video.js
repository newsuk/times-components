import React from "react";
import { View } from "react-native";

import Player from "./brightcove-player";
import Splash from "./splash";
import TapToLaunch from "./tap-to-launch";

const BrightcoveVideo = props =>
  props.autoplay
    ? <Player {...props} />
    : <TapToLaunch>
        {isLaunched =>
          <View style={{ width: props.width, height: props.height }}>
            {isLaunched
              ? <Player {...props} autoplay />
              : <Splash {...props} />}
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

export default BrightcoveVideo;
