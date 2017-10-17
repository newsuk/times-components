import React, { Component } from "react";
import { View, TouchableWithoutFeedback, NativeModules } from "react-native";
import PropTypes from "prop-types";

import Player from "./brightcove-player";
import Splash from "./splash";

const BrightcoveFullscreenPlayerModule =
  NativeModules.BrightcoveFullscreenPlayer;

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLaunched: props.autoplay
    };

    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  // specifically check if is launched has changed and block update if it has not;
  // this is so we don't keep reseting our player reference
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.isLaunched !== this.state.isLaunched || nextProps !== this.props
    );
  }

  play() {
    if (BrightcoveFullscreenPlayerModule && this.props.directToFullscreen) {
      BrightcoveFullscreenPlayerModule.playVideo({
        accountId: this.props.accountId,
        videoId: this.props.videoId,
        policyKey: this.props.policyKey
      });
    } else {
      if (this.playerRef) {
        this.playerRef.play();
      }

      this.setState({ isLaunched: true });
    }
  }

  pause() {
    if (this.playerRef) {
      this.playerRef.pause();
    }
  }

  reset() {
    this.setState({ isLaunched: false });
  }

  handleFinish() {
    if (this.props.resetOnFinish) {
      this.reset();
    }

    this.props.onFinish();
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
          onFinish={this.handleFinish}
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
  {
    resetOnFinish: PropTypes.bool,
    directToFullscreen: PropTypes.bool
  },
  Splash.propTypes,
  Player.propTypes
);

BrightcoveVideo.defaultProps = Object.assign(
  {
    resetOnFinish: false,
    directToFullscreen: false
  },
  Splash.defaultProps,
  Player.defaultProps
);

export default BrightcoveVideo;
