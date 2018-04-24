import React, { Component } from "react";
import {
  brightcoveVideoDefaultProps,
  brightcoveVideoPropTypes
} from "./brightcove-video-prop-types";

import Player from "./brightcove-player";
import VideoError from "./error";

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLaunched: props.autoplay,
      error: null
    };

    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleError = this.handleError.bind(this);
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
    this.setState({ isLaunched: false, error: null });
  }

  handleFinish() {
    if (this.props.resetOnFinish) {
      this.reset();
    }

    this.props.onFinish();
  }

  handleError(error) {
    this.setState({ error });

    this.props.onError(error);
  }

  render() {
    if (this.state.error) {
      return <VideoError {...this.props} onReset={this.reset} />;
    }

    return (
      <Player
        ref={ref => {
          this.playerRef = ref;
        }}
        {...this.props}
        onError={this.handleError}
        onFinish={this.handleFinish}
      />
    );
  }
}

BrightcoveVideo.propTypes = brightcoveVideoPropTypes;
BrightcoveVideo.defaultProps = brightcoveVideoDefaultProps;

export default BrightcoveVideo;
