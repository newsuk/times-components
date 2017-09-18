import React, { Component } from "react";
import { View } from "react-native";

import Player from "./brightcove-player";
import Splash from "./splash";
import TapToLaunch from "./tap-to-launch";

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launched: props.autoplay
    };
  }

  play() {
    if (!this.state.launched) {
      this.setState({ launched: true });
    } else if (this.playerRef) {
      this.playerRef.play();
    }
  }

  pause() {
    if (this.playerRef) {
      this.playerRef.pause();
    }
  }

  reset() {
    if (this.state.launched) {
      this.setState({ launched: false });
    }
  }

  render() {
    this.playerRef = null;

    return (
      <TapToLaunch launched={this.state.launched}>
        {isLaunched => (
          <View style={{ width: this.props.width, height: this.props.height }}>
            {isLaunched ? (
              <Player
                ref={ref => {
                  this.playerRef = ref;
                }}
                {...this.props}
                autoplay
              />
            ) : (
              <Splash {...this.props} />
            )}
          </View>
        )}
      </TapToLaunch>
    );
  }
}

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
