import React, { Component } from "react";
import { View } from "react-native";

let index = 0;

class BrightcoveVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerStatus: "paused",
      playheadPosition: "0"
    };
  }

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

  emitState() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  onPlay(player) {
    this.setState({
      playerStatus: "playing",
      playheadPosition: player.currentTime()
    });

    this.emitState();
  }

  onPause(player) {
    this.setState({
      playerStatus: "paused",
      playheadPosition: player.currentTime()
    });

    this.emitState();
  }

  onSeeked(player) {
    this.setState({
      playheadPosition: player.currentTime()
    });

    this.emitState();
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
