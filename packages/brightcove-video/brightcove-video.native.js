import React, { Component } from "react";
import { requireNativeComponent } from "react-native";

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const NativeBrightcove = this.getNativeBrightcoveComponent();

    return (
      <NativeBrightcove
        style={{ height: this.props.height, width: this.props.width }}
        policyId={this.props.policyId}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        onChange={this._onChange}
      />
    );
  }

  getNativeBrightcoveComponent() {
    return RNTBrightcove;
  }

  _onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.nativeEvent);
    }
  }
}

BrightcoveVideo.defaultProps = {
  width: 320,
  height: 180
};

const RNTBrightcove = requireNativeComponent("RNTBrightcove", null);

export default BrightcoveVideo;
