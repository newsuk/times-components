import React, { Component } from "react";
import { View, TouchableWithoutFeedback, NativeModules } from "react-native";
import {
  brightcoveVideoDefaultProps,
  brightcoveVideoPropTypes
} from "./brightcove-video-prop-types";

import Player from "./brightcove-player";
import Splash from "./splash";
import VideoError from "./error";

const BrightcoveFullscreenPlayerModule =
  NativeModules.BrightcoveFullscreenPlayer;

class BrightcoveVideo extends Component {
  static getBrightcoveFullscreenPlayerModule() {
    return BrightcoveFullscreenPlayerModule;
  }

  static activePlayers = [];

  constructor(props) {
    super(props);

    this.state = {
      isLaunched: props.autoplay,
      error: null
    };
  }

  componentDidMount() {
    BrightcoveVideo.activePlayers.push(this);
  }
  // specifically check if is launched has changed and block update if it has not;
  // this is so we don't keep reseting our player reference
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.isLaunched !== this.state.isLaunched ||
      nextState.error !== this.state.error ||
      nextProps !== this.props
    );
  }

  componentWillUnmount() {
    BrightcoveVideo.activePlayers.splice(
      BrightcoveVideo.activePlayers.indexOf(this)
    );
  }

  play = () => {
    const nativeModule = BrightcoveVideo.getBrightcoveFullscreenPlayerModule();

    if (nativeModule && this.props.directToFullscreen) {
      nativeModule.playVideo({
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
  };

  pause = () => {
    if (this.playerRef) {
      this.playerRef.pause();
    }
  };

  reset = () => {
    this.setState({ isLaunched: false, error: null });
  };

  handlePlay = () => {
    BrightcoveVideo.activePlayers.forEach(player => {
      if (player !== this) {
        player.pause();
      }
    });
  };

  handleFinish = () => {
    if (this.props.resetOnFinish) {
      this.reset();
    }

    this.props.onFinish();
  };

  handleError = error => {
    this.setState({ error });

    this.props.onError(error);
  };

  render() {
    this.playerRef = null;

    if (this.state.error) {
      return <VideoError {...this.props} onReset={this.reset} />;
    }

    if (this.state.isLaunched) {
      return (
        <Player
          ref={ref => {
            this.playerRef = ref;
          }}
          {...this.props}
          autoplay
          onError={this.handleError}
          onFinish={this.handleFinish}
          onPlay={this.handlePlay}
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

BrightcoveVideo.propTypes = brightcoveVideoPropTypes;
BrightcoveVideo.defaultProps = brightcoveVideoDefaultProps;

export default BrightcoveVideo;
