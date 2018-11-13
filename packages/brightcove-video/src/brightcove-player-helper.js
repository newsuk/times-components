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
      isFinished: false,
      isPlaying: false,
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.onError = this.onError.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    this.publicMethods = {
      pause: this.pause.bind(this),
      play: this.play.bind(this)
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
    const { onError } = this.props;

    onError(evt.nativeEvent);
  }

  getNodeHandle() {
    return findNodeHandle(this.bcPlayer);
  }

  handleChange(evt) {
    const newState = {
      duration: evt.nativeEvent.duration,
      isFinished: evt.nativeEvent.isFinished,
      isPlaying: evt.nativeEvent.isPlaying,
      progress: evt.nativeEvent.progress
    };

    const {
      onChange,
      onDuration,
      onFinish,
      onPause,
      onPlay,
      onProgress
    } = this.props;
    const { duration, isFinished, isPlaying, progress } = this.state;

    const playerStatusChanged = newState.isPlaying !== isPlaying;

    if (newState.duration !== duration) {
      onDuration(newState.duration);
    }

    if (playerStatusChanged && newState.isPlaying) {
      onPlay();
    }

    if (newState.progress !== progress) {
      onProgress(newState.progress);
    }

    if (playerStatusChanged && !newState.isPlaying) {
      onPause();
    }

    if (newState.isFinished !== isFinished && newState.isFinished) {
      onFinish();
    }

    if (onChange) {
      onChange(evt.nativeEvent);
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
    const { runNativeCommand } = this.props;

    runNativeCommand("play", []);
  }

  pause() {
    const { runNativeCommand } = this.props;

    runNativeCommand("pause", []);
  }

  render() {
    const {
      accountId,
      autoplay,
      height,
      hideFullScreenButton,
      policyKey,
      position,
      videoId,
      width,
      zIndex
    } = this.props;
    const NativeBrightcove = BrightcoveVideo.getNativeBrightcoveComponent();

    return (
      <NativeBrightcove
        accountId={accountId}
        autoplay={autoplay}
        hideFullScreenButton={hideFullScreenButton}
        onChange={this.handleChange}
        onIOSError={this.onError}
        onLoadingError={this.onError}
        policyKey={policyKey}
        ref={ref => {
          this.bcPlayer = ref;
        }}
        style={{
          height,
          position,
          width,
          zIndex
        }} // android handler seems to be reserved on iOS
        videoId={videoId} // so we use this instead
      />
    );
  }
}

BrightcoveVideo.defaultProps = Object.assign(
  {
    onChange: () => {},
    position: "relative",
    runNativeCommand: () => {},
    zIndex: 0
  },
  defaults
);
BrightcoveVideo.propTypes = {
  ...propTypes,
  onChange: PropTypes.func,
  policyKey: PropTypes.string.isRequired,
  position: PropTypes.string,
  runNativeCommand: PropTypes.func.isRequired,
  zIndex: PropTypes.number
};

export default BrightcoveVideo;
