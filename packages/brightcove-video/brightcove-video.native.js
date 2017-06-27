import React, { Component } from "react";
import { requireNativeComponent } from "react-native";

class BrightcoveVideo extends Component {
  render() {
    return (
      <RNTBrightcove
        style={{ height: this.props.height, width: this.props.width }}
        policyId={this.props.policyId}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
      />
    );
  }
}

BrightcoveVideo.defaultProps = {
  width: "100%",
  height: "100%"
};

const RNTBrightcove = requireNativeComponent("RNTBrightcove", null);

export default BrightcoveVideo;
