import React, { Component } from "react";
import { Image } from "react-native";

import {
  brightcoveVideoDefaultProps,
  brightcoveVideoPropTypes
} from "./brightcove-video.proptypes";

import Player from "./brightcove-player";
import VideoError from "./error";
import IsPaidSubscriber from "./is-paid-subscriber";

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

  // TODO:
  //
  // 1. Get snapshots working. Currently we're using the native component.
  // 1.1 Should I refactor the component? Poster image only for native?
  // 1.2 Ask Tunca what the state of the native component is.
  // 2. Fix test coverage.

  render() {
    const { paidonly, width, height, poster } = this.props;

    if (this.state.error) {
      return <VideoError {...this.props} onReset={this.reset} />;
    }

    return (
      <IsPaidSubscriber.Consumer>
        {isPaidSubscriber =>
          paidonly && !isPaidSubscriber ? (
            <Image style={{ width, height }} source={poster} />
          ) : (
            <Player
              ref={ref => {
                this.playerRef = ref;
              }}
              {...this.props}
              onError={this.handleError}
              onFinish={this.handleFinish}
            />
          )
        }
      </IsPaidSubscriber.Consumer>
    );
  }
}

BrightcoveVideo.propTypes = brightcoveVideoPropTypes;
BrightcoveVideo.defaultProps = brightcoveVideoDefaultProps;

export default BrightcoveVideo;
