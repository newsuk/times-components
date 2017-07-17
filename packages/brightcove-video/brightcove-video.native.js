import React, { Component } from "react";
import { findNodeHandle, requireNativeComponent } from "react-native";
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
      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onError = this.onError.bind(this);

    this.publicMethods = {
      play: this.play.bind(this),
      pause: this.pause.bind(this)
    };
  }

  onChange(evt) {
    this.props.onChange(evt.nativeEvent);
  }

  onError(evt) {
    this.props.onError(evt.nativeEvent);
  }

  getNodeHandle() {
    return findNodeHandle(this.bcPlayer);
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
        onChange={this.onChange}
        onLoadingError={this.onError} // android handler seems to be reserved on iOS
        onIOSError={this.onError} // so we use this instead
      />
    );
  }
}

BrightcoveVideo.defaultProps = Object.assign(defaults, {
  runNativeCommand: () => {}
});
BrightcoveVideo.propTypes = Object.assign(propTypes, {
  runNativeCommand: PropTypes.func.isRequired
});

export default BrightcoveVideo;
