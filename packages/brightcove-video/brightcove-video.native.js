import React, { Component } from "react";
import { requireNativeComponent } from "react-native";

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    console.log("logging works");
    const height = this.props.height || "100%";
    const width = this.props.width || "100%";

    return (
      <RNTBrightcove
        style={{ height, width }}
        policyId={this.props.policyId}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        onChange={this._onChange}
      />
    );
  }

  _onChange(event) {
    console.log(event.nativeEvent.Event);
  }

  onPlay() {
    if (this.props.onPlay) {
      this.props.onPlay();
    } else {
      console.log("on play");
    }
  }

  onPause() {
    if (this.props.onPause) {
      this.props.onPause();
    } else {
      console.log("on pause");
    }
  }

  onSeeked() {}
}

const RNTBrightcove = requireNativeComponent("RNTBrightcove", null);

export default BrightcoveVideo;
