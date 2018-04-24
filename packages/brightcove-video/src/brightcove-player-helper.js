import React, { Component } from "react";
import { findNodeHandle, requireNativeComponent, AppState } from "react-native";
import PropTypes from "prop-types";

import propTypes from "./brightcove-player-prop-types";
import defaults from "./brightcove-player.defaults";

const nativeClassName = "RNTBrightcove";

class BrightcoveVideo extends Component {
  static RNTBrightcove = null;

  /* Singleton accessor pattern to avoid double
   * native component loading across packages.
   */
  static getNativeBrightcoveComponent() {
    if (!BrightcoveVideo.RNTBrightcove) {
      BrightcoveVideo.RNTBrightcove = requireNativeComponent(
        nativeClassName,
        null
      );
    }

    return BrightcoveVideo.RNTBrightcove;
  }

  static getNativeClassName() {
    return nativeClassName;
  }

  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      appState: AppState.currentState,
      isPlaying: false,
      isFinished: false,
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.onError = this.onError.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    this.publicMethods = {
      play: this.play.bind(this),
      pause: this.pause.bind(this)
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    if (AppState.removeEventListener) {
      AppState.removeEventListener("change", this.handleAppStateChange);
    }
  }

  onError(evt) {
    this.props.onError(evt.nativeEvent);
  }

  getNodeHandle() {
    return findNodeHandle(this.bcPlayer);
  }

  handleChange(evt) {
    const newState = {
      isPlaying: evt.nativeEvent.isPlaying,
      duration: evt.nativeEvent.duration,
      progress: evt.nativeEvent.progress,
      isFinished: evt.nativeEvent.isFinished
    };

    const playerStatusChanged = newState.isPlaying !== this.state.isPlaying;

    if (newState.duration !== this.state.duration) {
      this.props.onDuration(newState.duration);
    }

    if (playerStatusChanged && newState.isPlaying) {
      this.props.onPlay();
    }

    if (newState.progress !== this.state.progress) {
      this.props.onProgress(newState.progress);
    }

    if (playerStatusChanged && !newState.isPlaying) {
      this.props.onPause();
    }

    if (newState.isFinished !== this.state.isFinished && newState.isFinished) {
      this.props.onFinish();
    }

    if (this.props.onChange) {
      this.props.onChange(evt.nativeEvent);
    }

    this.setState(newState);
  }

  handleAppStateChange(nextAppState) {
    this.setState(prevState => {
      const nextState = { appState: nextAppState };

      if (prevState.appState !== nextAppState) {
        if (
          nextAppState === "active" &&
          prevState.wasPlayingBeforeAppBackgrounded
        ) {
          nextState.wasPlayingBeforeAppBackgrounded = false;
          this.play();
        } else if (prevState.isPlaying && nextAppState !== "active") {
          nextState.wasPlayingBeforeAppBackgrounded = true;
          this.pause();
        }
      }

      return nextState;
    });
  }

  play() {
    this.props.runNativeCommand("play", []);
  }

  pause() {
    this.props.runNativeCommand("pause", []);
  }

  render() {
    const NativeBrightcove = BrightcoveVideo.getNativeBrightcoveComponent();

    return (
      <NativeBrightcove
        ref={ref => {
          this.bcPlayer = ref;
        }}
        style={{
          height: this.props.height,
          width: this.props.width,
          position: this.props.position,
          zIndex: this.props.zIndex
        }}
        policyKey={this.props.policyKey}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        autoplay={this.props.autoplay}
        hideFullScreenButton={this.props.hideFullScreenButton}
        onChange={this.handleChange}
        onLoadingError={this.onError} // android handler seems to be reserved on iOS
        onIOSError={this.onError} // so we use this instead
      />
    );
  }
}

BrightcoveVideo.defaultProps = Object.assign(
  {
    runNativeCommand: () => {},
    onChange: () => {},
    position: "relative",
    zIndex: 0
  },
  defaults
);
BrightcoveVideo.propTypes = {
  runNativeCommand: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  position: PropTypes.string,
  zIndex: PropTypes.number,
  ...propTypes,
  policyKey: PropTypes.string.isRequired
};

export default BrightcoveVideo;
