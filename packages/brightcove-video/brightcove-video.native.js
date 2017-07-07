import React, { Component } from "react";
import { requireNativeComponent } from "react-native";

import propTypes from "./brightcove-video.proptypes";
import defaults from "./brightcove-video.defaults";

const RNTBrightcove = requireNativeComponent("RNTBrightcove", null);

class BrightcoveVideo extends Component {
  static getNativeBrightcoveComponent() {
    return RNTBrightcove;
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange(event.nativeEvent);
  }

  render() {
    const NativeBrightcove = BrightcoveVideo.getNativeBrightcoveComponent();

    return (
      <NativeBrightcove
        style={{ height: this.props.height, width: this.props.width }}
        policyId={this.props.policyId}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        onChange={this.onChange}
      />
    );
  }
}

BrightcoveVideo.defaultProps = defaults;
BrightcoveVideo.propTypes = propTypes;

export default BrightcoveVideo;
