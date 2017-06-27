import React, { Component } from "react";
import { View } from "react-native";

let index = 0;

class BrightcoveVideo extends Component {
  componentDidMount() {
    if (!BrightcoveVideo.hasLoadedScript) {
      const s = document.createElement("script");
      BrightcoveVideo.hasLoadedScript = true;

      s.src = `//players.brightcove.net/${this.props
        .accountId}/default_default/index.min.js`;
      document.body.appendChild(s);
      return;
    }
    this.init();
  }

  init() {
    if (window.bc && window.videojs) {
      BrightcoveVideo.initVideo(this.id);
    }
  }

  static initVideo(id) {
    bc(document.getElementById(id));
    videojs(id);
  }

  render() {
    this.id = `${this.props.videoId}-${this.props.accountId}-${index}`;
    index++;

    return (
      <View>
        <video
          id={this.id}
          width={this.props.width}
          height={this.props.height}
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

BrightcoveVideo.defaultProps = {
  width: 320,
  height: 180
};

BrightcoveVideo.hasLoadedScript = false;

export default BrightcoveVideo;
