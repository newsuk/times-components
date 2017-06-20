import React, { Component } from "react";
import { View } from "react-native";

let id = 0,
  hasLoadedScript = false;

class BrightcoveVideo extends Component {
  componentDidMount() {
    if (!hasLoadedScript) {
      const s = document.createElement("script");
      hasLoadedScript = true;

      s.src = `//players.brightcove.net/${this.props
        .accountId}/default_default/index.min.js`;
      document.body.appendChild(s);
    } else {
      this.init();
    }
  }

  init() {
    if (window.bc) {
      bc(document.getElementById(this.id));
      videojs(this.id);
    }
  }

  render() {
    const width = this.props.width || 320;
    const height = this.props.height || 180;
    this.id = `_${id++}`;

    return (
      <View width="100%" height="100%">
        <video
          id={this.id}
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
