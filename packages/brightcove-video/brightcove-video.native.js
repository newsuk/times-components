import React, { Component } from "react";
import { findNodeHandle, requireNativeComponent, AppState } from "react-native";
import PropTypes from "prop-types";

import propTypes from "./brightcove-video.proptypes";
import defaults from "./brightcove-video.defaults";

const nativeClassName = "RNTBrightcove";
const RNTBrightcove = requireNativeComponent(nativeClassName, null);

class BrightcoveVideo extends Component {
  static getNativeBrightcoveComponent() {
    return RNTBrightcove;
  }

  static getNativeClassName() {
    return nativeClassName;
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      appState: AppState.currentState
    };

    this.onChange = this.onChange.bind(this);
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
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  onChange(evt) {
    this.props.onChange(evt.nativeEvent);

    this.setState({ playing: evt.nativeEvent.playerStatus === "playing" });
  }

  onError(evt) {
    this.props.onError(evt.nativeEvent);
  }

  getNodeHandle() {
    return findNodeHandle(this.bcPlayer);
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState !== nextAppState) {
      if (
        nextAppState === "active" &&
        this.state.wasPlayingBeforeAppBackgrounded
      ) {
        this.setState({ wasPlayingBeforeAppBackgrounded: false });
        this.play();
      } else if (this.state.playing && nextAppState !== "active") {
        this.setState({ wasPlayingBeforeAppBackgrounded: true });
        this.pause();
      }
    }

    this.setState({ appState: nextAppState });
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
        style={{ height: this.props.height, width: this.props.width }}
        policyKey={this.props.policyKey}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        autoplay={this.props.autoplay}
        onChange={this.onChange}
        onLoadingError={this.onError} // android handler seems to be reserved on iOS
        onIOSError={this.onError} // so we use this instead
      />
    );
  }
}

BrightcoveVideo.defaultProps = Object.assign(
  { runNativeCommand: () => {} },
  defaults
);
BrightcoveVideo.propTypes = Object.assign(
  { runNativeCommand: PropTypes.func.isRequired },
  propTypes
);

export default BrightcoveVideo;
