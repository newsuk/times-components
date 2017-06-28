import React, { Component } from "react";
import { requireNativeComponent } from "react-native";

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <RNTBrightcove
        style={{ height: this.props.height, width: this.props.width }}
        policyId={this.props.policyId}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        onChange={this._onChange}
      />
    );
  }

  _onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.nativeEvent);
    }
  }
}

BrightcoveVideo.defaultProps = {
  width: "100%",
  height: "100%"
};

const RNTBrightcove = requireNativeComponent("RNTBrightcove", null);

export default BrightcoveVideo;
