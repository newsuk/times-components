/* eslint-env browser */
/* globals videojs, bc */

import React, { Component } from "react";
import { Image } from "react-native";
import propTypes from "./brightcove-player-prop-types";
import defaults from "./brightcove-player.defaults";

const SourcePropType = Image.propTypes.source;

let index = 0;

const playButtonDimensions = "85px";
const playButtonBorderWidth = "4px";
const playButtonBorderColor = "white";
const styles = `
.video-js .vjs-big-play-button {
  width: ${playButtonDimensions};
  height: ${playButtonDimensions};

  background: transparent !important;

  line-height: 1.65em;

  border-radius: 0;
  border-style: solid;
  border-width: ${playButtonBorderWidth};
  border-color: ${playButtonBorderColor};
}

.video-js .vjs-big-play-button:before {
  font-size: 77px;
  left: -2px;
}

.video-js .vjs-dock-text {
  visibility: hidden;
}
`;

class BrightcoveVideo extends Component {
  static handlePlayerReady(context) {
    context.setPlayer(this);

    this.on("play", context.onPlay.bind(context, this));
    this.on("pause", context.onPause.bind(context, this));
    this.on("seeked", context.onSeeked.bind(context, this));
    this.on("timeupdate", context.onPlay.bind(context, this));
    this.on("durationchange", context.onDurationChange.bind(context, this));
    this.on("ended", context.onEnded.bind(context, this));

    this.contextmenu({ disabled: true });
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static attachStyles() {
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    const cssText = document.createTextNode(styles);
    styleTag.appendChild(cssText);
    document.head.appendChild(styleTag);
  }

  static getScriptUrl(accountId, playerId) {
    return `//players.brightcove.net/${accountId}/${
      playerId
    }_default/index.min.js`;
  }

  static getCurrentTimeMs(player) {
    return Math.round(player.currentTime() * 1000);
  }

  static getDurationMs(player) {
    return Math.round(player.duration() * 1000);
  }

  constructor(props) {
    super(props);

    index += 1;

    BrightcoveVideo.globalErrors.forEach(this.props.onError);

    this.state = {
      errors: [].concat(BrightcoveVideo.globalErrors),
      id: `${props.videoId}-${props.accountId}-${index}`,
      isFinished: false,
      isPlaying: "paused",
      progress: 0
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

        this.props.onError(uriErr);
      };

      BrightcoveVideo.appendScript(s);
      BrightcoveVideo.attachStyles();
    }

    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    const playerStatusChanged = prevState.isPlaying !== this.state.isPlaying;

    if (prevState.duration !== this.state.duration) {
      prevProps.onDuration(this.state.duration);
    }

    if (playerStatusChanged && this.state.isPlaying) {
      prevProps.onPlay();
    }

    if (prevState.progress !== this.state.progress) {
      prevProps.onProgress(this.state.progress);
    }

    if (playerStatusChanged && !this.state.isPlaying) {
      prevProps.onPause();
    }

    if (
      prevState.isFinished !== this.state.isFinished &&
      this.state.isFinished
    ) {
      prevProps.onFinish();
    }

    return prevProps !== this.props;
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  onError(player) {
    this.props.onError(player.error());
  }

  onPlay(player) {
    this.setState({
      isFinished: false,
      isPlaying: true,
      progress: BrightcoveVideo.getCurrentTimeMs(player)
    });
  }

  onPause(player) {
    const progress = BrightcoveVideo.getCurrentTimeMs(player);

    this.setState({
      isPlaying: false,
      progress
    });
  }

  onSeeked(player) {
    this.setState({
      isFinished: false,
      progress: BrightcoveVideo.getCurrentTimeMs(player)
    });
  }

  onDurationChange(player) {
    this.setState({ duration: BrightcoveVideo.getDurationMs(player) });
  }

  onEnded() {
    // calling syncronously here inteferes with player and causes errors to be thrown
    setTimeout(() => {
      this.setState({ isFinished: true });
    }, 0);
  }

  setPlayer(player) {
    this.player = player;
  }

  createScript() {
    const s = document.createElement("script");
    s.src = BrightcoveVideo.getScriptUrl(
      this.props.accountId,
      this.props.playerId
    );

    return s;
  }

  initVideoJS(id) {
    const player = videojs(id);
    const handler = BrightcoveVideo.handlePlayerReady.bind(player, this);

    player.ready(handler);
    player.on("error", this.onError.bind(this, player));
  }

  initVideo(id) {
    bc(document.getElementById(id), {
      controlBar: {
        fullscreenToggle: !this.props.hideFullScreenButton
      }
    });

    this.initVideoJS(id);
  }

  init() {
    if (window.bc && window.videojs) {
      this.initVideo(this.state.id);
    } else {
      BrightcoveVideo.players.push(this);
    }
  }

  play() {
    if (this.player) {
      this.player.play();
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  render() {
    /* eslint jsx-a11y/media-has-caption: "off" */
    // Added a wrapping div as brightcove adds siblings to the video tag
    return (
      <div
        style={{
          height: this.props.height,
          width: this.props.width
        }}
      >
        <video
          id={this.state.id}
          style={{
            height: this.props.height,
            width: this.props.width
          }}
          {...(this.props.poster ? { poster: this.props.poster.uri } : {})}
          // following 'autoplay' can not expected to always work on web
          // see: https://docs.brightcove.com/en/player/brightcove-player/guides/in-page-embed-player-implementation.html
          autoPlay={this.props.autoplay}
          className="video-js"
          controls
          data-account={this.props.accountId}
          data-application-id
          data-embed="default"
          data-player={this.props.playerId}
          data-video-id={this.props.videoId}
        />
      </div>
    );
  }
}

BrightcoveVideo.globalErrors = [];

BrightcoveVideo.defaultProps = defaults;

BrightcoveVideo.propTypes = { poster: SourcePropType, ...propTypes };

export default BrightcoveVideo;
