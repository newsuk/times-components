import React, { Component } from "react";
import { View } from "react-native";

class BrightcoveVideo extends Component {
  componentDidMount() {
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${this.props
      .accountId}/default_default/index.min.js`;
    document.body.appendChild(s);
  }

  render() {
    const width = this.props.width || 320;
    const height = this.props.height || 180;

    return (
      <View width="100%" height="100%">
        <video
          width={width}
          height={height}
          data-embed="default"
          data-video-id={this.props.videoId}
          data-account={this.props.accountId}
          data-player="default"
          data-application-id
          className="video-js"
          controls
        />
      </View>
    );
  }
}

export default BrightcoveVideo;
