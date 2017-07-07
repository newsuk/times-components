/* eslint-env browser */
/* globals videojs, bc */

import React, { Component } from "react";
import { View } from "react-native";

import propTypes from "./brightcove-video.proptypes";
import defaults from "./brightcove-video.defaults";

let index = 0;

class BrightcoveVideo extends Component {
  static handlePlayerReady(context) {
    context.setPlayer(this);

    this.on("play", context.onPlay.bind(context, this));
    this.on("pause", context.onPause.bind(context, this));
    this.on("seeked", context.onSeeked.bind(context, this));
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static getScriptUrl(accountId) {
    return `//players.brightcove.net/${accountId}/default_default/index.min.js`;
  }

  constructor(props) {
    super(props);

    index += 1;

    this.state = {
      id: `${props.videoId}-${props.accountId}-${index}`,
      accountId: props.accountId,
      videoId: props.videoId,
      errors: [].concat(BrightcoveVideo.globalErrors),
      playerStatus: "paused",
      playheadPosition: 0
    };
  }

  componentDidMount() {
    if (this.state.errors.length) {
      return;
    }

    // only ever append script once
    if (!BrightcoveVideo.players) {
      BrightcoveVideo.players = [];

      const s = this.createScript();

      s.onload = () => {
        BrightcoveVideo.players.forEach(player =>
          player.initVideoJS(player.state.id)
        );
      };

      // handle script not loading
      s.onerror = err => {
        const uriErr = {
          code: "",
          message: `The script ${err.target.src} is not accessible.`
        };

        BrightcoveVideo.globalErrors.push(uriErr);

        this.emitError(uriErr);
      };

      BrightcoveVideo.appendScript(s);
    }

    this.init();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  onError(player) {
    this.emitError(player.error());
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

  setPlayer(player) {
    this.player = player;
  }

  createScript() {
    const s = document.createElement("script");
    s.src = BrightcoveVideo.getScriptUrl(this.props.accountId);

    return s;
  }

  emitState() {
    this.props.onChange(this.state);
  }

  emitError(err) {
    const errors = [].concat(this.state.errors);
    errors.push(err);
    this.setState({ errors });
    this.props.onError(err);
  }

  initVideoJS(id) {
    const player = videojs(id);
    const handler = BrightcoveVideo.handlePlayerReady.bind(player, this);

    player.ready(handler);
    player.on("error", this.onError.bind(this, player));
  }

  initVideo(id) {
    bc(document.getElementById(id));
    this.initVideoJS(id);
  }

  init() {
    if (window.bc && window.videojs) {
      this.initVideo(this.state.id);
    } else {
      BrightcoveVideo.players.push(this);
    }
  }

  render() {
    if (this.state.errors.length) {
      /* eslint jsx-a11y/media-has-caption: "off" */

      const errorItems = this.state.errors.map(error =>
        <li key={`${error.code}_${error.message}`} style={{ color: "white" }}>
          {error.code} - {error.message}
        </li>
      );

      return (
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: "red"
          }}
        >
          <ul>{errorItems}</ul>
        </View>
      );
    }

    // Wrapping div required as brightcove adds siblings to the video tag
    return (
      <div>
        <video
          id={this.state.id}
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
      </div>
    );
  }
}

BrightcoveVideo.globalErrors = [];

BrightcoveVideo.defaultProps = defaults;
BrightcoveVideo.propTypes = propTypes;

export default BrightcoveVideo;
