import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Player from "./brightcove-player";
import Splash from "./splash";

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLaunched: props.autoplay
    };

    this.play = this.play.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isLaunched !== this.state.isLaunched;
  }

  play() {
    if (this.playerRef) {
      this.playerRef.play();
    }

    this.setState({ isLaunched: true });
  }

  pause() {
    if (this.playerRef) {
      this.playerRef.pause();
    }
  }

  reset() {
    this.setState({ isLaunched: false });
  }

  render() {
    this.playerRef = null;

    if (this.state.isLaunched) {
      return (
        <Player
          ref={ref => {
            this.playerRef = ref;
          }}
          {...this.props}
          autoplay
        />
      );
    }

    return (
      <TouchableWithoutFeedback onPress={this.play}>
        <View style={{ width: this.props.width, height: this.props.height }}>
          <Splash {...this.props} />
        </View>
      </TouchableWithoutFeedback>
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
