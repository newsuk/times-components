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
      error: null,
      isLaunched: props.autoplay
    };
  }

  componentDidMount() {
    BrightcoveVideo.activePlayers.push(this);
  }

  // specifically check if is launched has changed and block update if it has not;
  // this is so we don't keep reseting our player reference
  shouldComponentUpdate(nextProps, nextState) {
    const { error, isLaunched } = this.state;

    return (
      nextState.isLaunched !== isLaunched ||
      nextState.error !== error ||
      nextProps !== this.props
    );
  }

  componentWillUnmount() {
    BrightcoveVideo.activePlayers.splice(
      BrightcoveVideo.activePlayers.indexOf(this)
    );
  }

  play = () => {
    const { accountId, directToFullscreen, policyKey, videoId } = this.props;

    const nativeModule = BrightcoveVideo.getBrightcoveFullscreenPlayerModule();

    if (nativeModule && directToFullscreen) {
      nativeModule.playVideo({
        accountId,
        policyKey,
        videoId
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
    this.setState({
      error: null,
      isLaunched: false
    });
  };

  handlePlay = () => {
    BrightcoveVideo.activePlayers.forEach(player => {
      if (player !== this) {
        player.pause();
      }
    });
  };

  handleFinish = () => {
    const { onFinish, resetOnFinish } = this.props;

    if (resetOnFinish) {
      this.reset();
    }

    onFinish();
  };

  handleError = error => {
    const { onError } = this.props;

    this.setState({ error });

    onError(error);
  };

  render() {
    const { height, width } = this.props;
    const { error, isLaunched } = this.state;

    this.playerRef = null;

    if (error) {
      return <VideoError {...this.props} onReset={this.reset} />;
    }

    if (isLaunched) {
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
        <View
          style={{
            height,
            width
          }}
        >
          <Splash {...this.props} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BrightcoveVideo.propTypes = brightcoveVideoPropTypes;
BrightcoveVideo.defaultProps = brightcoveVideoDefaultProps;

export default BrightcoveVideo;
