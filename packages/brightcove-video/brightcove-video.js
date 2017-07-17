import React, { Component } from "react";
import {
  NativeModules,
  findNodeHandle,
  Platform,
  requireNativeComponent
} from "react-native";

import propTypes from "./brightcove-video.proptypes";
import defaults from "./brightcove-video.defaults";

const nativeClassName = "RNTBrightcove";
const RNTBrightcove = requireNativeComponent(nativeClassName, null);

class BrightcoveVideo extends Component {
  static getNativeBrightcoveComponent() {
    return RNTBrightcove;
  }

  static uiManagerCommand(name) {
    return NativeModules.UIManager[nativeClassName].Commands[name];
  }

  static brightcoveManagerCommand(name) {
    return NativeModules[`${nativeClassName}Manager`][name];
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.onChange = this.onChange.bind(this);
    this.onError = this.onError.bind(this);
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
    this.runNativeCommand("play", []);
  }

  pause() {
    this.runNativeCommand("pause", []);
  }

  runNativeCommand(name, args) {
    switch (Platform.OS) {
      case "android":
        NativeModules.UIManager.dispatchViewManagerCommand(
          this.getNodeHandle(),
          BrightcoveVideo.uiManagerCommand(name),
          args
        );
        break;

      case "ios":
        BrightcoveVideo.brightcoveManagerCommand(name)(
          this.getNodeHandle(),
          ...args
        );
        break;

      default:
        break;
    }
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

BrightcoveVideo.defaultProps = defaults;
BrightcoveVideo.propTypes = propTypes;

export default BrightcoveVideo;
