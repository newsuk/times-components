import React, { Component } from "react";
import { View } from "react-native";

let index = 0;

class BrightcoveVideo extends Component {
  componentDidMount() {
    if (!BrightcoveVideo.hasLoadedScript) {
      const s = document.createElement("script");
      BrightcoveVideo.hasLoadedScript = true;

      s.src = BrightcoveVideo.getScriptUrl(this.props.accountId);

      // handle script not loading
      s.onerror = err => {
        const uriErr = new URIError(
          `The script ${err.target.src} is not accessible.`
        );

        if (!this.props.onError) {
          throw uriErr;
        } else {
          this.props.onError(uriErr);
        }
      };

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

  static getScriptUrl(accountId) {
    return `//players.brightcove.net/${accountId}/default_default/index.min.js`;
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
