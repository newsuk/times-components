import React, { Component } from "react";
import { View } from "react-native";

class BrightcoveVideo extends Component {
  componentDidMount() {
    // add and execute the player script tag
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${this.props
      .accountId}/default_default/index.min.js`;
    document.body.appendChild(s);
  }

  render() {
    const width = this.props.width || 150;
    const height = this.props.height || 100;

    return (
      <View style={{ width, height }}>
        <video
          style={{ width: "100%", height: "100%" }}
          data-embed="default"
          data-video-id={this.props.videoId}
          data-account={this.props.accountId}
          data-player="default"
          className="video-js"
          data-application-id
          controls
        />
      </View>
    );
  }
}

export default BrightcoveVideo;
