import React, { Component } from "react";
import { View } from "react-native";

let index = 0;

class BrightcoveVideo extends Component {
  componentDidMount() {
    if (!BrightcoveVideo.hasLoadedScript) {
      BrightcoveVideo.hasLoadedScript = true;
      BrightcoveVideo.players = [];

      const s = document.createElement("script");

      s.src = BrightcoveVideo.getScriptUrl(this.props.accountId);

      s.onload = () => {
        BrightcoveVideo.players.forEach(player =>
          player.initVideoJS(player.id)
        );
      };

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
    }

    this.init();
  }

  static handlePlayerReady(context) {
    this.on("play", context.onPlay.bind(context, this));
    this.on("pause", context.onPause.bind(context, this));
    this.on("seeked", context.onSeeked.bind(context, this));
  }

  onPlay(player) {
    if (this.props.onPlay) {
      this.props.onPlay(player.currentTime());
    } else {
      console.log("playing from", player.currentTime());
    }
  }

  onPause(player) {
    if (this.props.onPause) {
      this.props.onPause(player.currentTime());
    } else {
      console.log("pausing at", player.currentTime());
    }
  }

  onSeeked(player) {
    if (this.props.onSeeked) {
      this.props.onSeeked(player.currentTime());
    } else {
      console.log("seeked to", player.currentTime());
    }
  }

  initVideoJS(id) {
    const player = videojs(id);
    const handler = BrightcoveVideo.handlePlayerReady.bind(player, this);

    player.ready(handler);
  }

  initVideo(id) {
    bc(document.getElementById(id));
    this.initVideoJS(id);
  }

  init() {
    if (window.bc && window.videojs) {
      this.initVideo(this.id);
    } else {
      BrightcoveVideo.players.push(this);
    }
  }

  static getScriptUrl(accountId) {
    return `//players.brightcove.net/${accountId}/default_default/index.min.js`;
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
