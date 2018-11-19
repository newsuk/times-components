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
    return `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
  }

  static getCurrentTimeMs(player) {
    return Math.round(player.currentTime() * 1000);
  }

  static getDurationMs(player) {
    return Math.round(player.duration() * 1000);
  }

  constructor(props) {
    super(props);

    const { onError } = this.props;

    index += 1;

    BrightcoveVideo.globalErrors.forEach(onError);

    this.state = {
      errors: [].concat(BrightcoveVideo.globalErrors),
      id: `${props.videoId}-${props.accountId}-${index}`,
      isFinished: false,
      isPlaying: "paused",
      progress: 0
    };
  }

  componentDidMount() {
    const { onError } = this.props;
    const { errors } = this.state;

    if (errors.length) {
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

        onError(uriErr);
      };

      BrightcoveVideo.appendScript(s);
      BrightcoveVideo.attachStyles();
    }

    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    const { duration, isFinished, isPlaying, progress } = this.state;

    const playerStatusChanged = prevState.isPlaying !== isPlaying;

    if (prevState.duration !== duration) {
      prevProps.onDuration(duration);
    }

    if (playerStatusChanged && isPlaying) {
      prevProps.onPlay();
    }

    if (prevState.progress !== progress) {
      prevProps.onProgress(progress);
    }

    if (playerStatusChanged && !isPlaying) {
      prevProps.onPause();
    }

    if (prevState.isFinished !== isFinished && isFinished) {
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
    const { onError } = this.props;

    onError(player.error());
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
    const { accountId, playerId } = this.props;

    const s = document.createElement("script");
    s.src = BrightcoveVideo.getScriptUrl(accountId, playerId);

    return s;
  }

  initVideoJS(id) {
    const player = videojs(id);
    const handler = BrightcoveVideo.handlePlayerReady.bind(player, this);

    player.ready(handler);
    player.on("error", this.onError.bind(this, player));
  }

  initVideo(id) {
    const { hideFullScreenButton } = this.props;

    bc(document.getElementById(id), {
      controlBar: {
        fullscreenToggle: !hideFullScreenButton
      }
    });

    this.initVideoJS(id);
  }

  init() {
    const { id } = this.state;

    if (window.bc && window.videojs) {
      this.initVideo(id);
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
    const {
      accountId,
      autoplay,
      height,
      playerId,
      poster,
      videoId,
      width
    } = this.props;
    const { id } = this.state;

    /* eslint jsx-a11y/media-has-caption: "off" */
    // Added a wrapping div as brightcove adds siblings to the video tag
    return (
      <div
        style={{
          height,
          width
        }}
      >
        <video
          id={id}
          style={{
            height,
            width
          }}
          {...(poster ? { poster: poster.uri } : {})}
          // following 'autoplay' can not expected to always work on web
          // see: https://docs.brightcove.com/en/player/brightcove-player/guides/in-page-embed-player-implementation.html
          autoPlay={autoplay}
          className="video-js"
          controls
          data-account={accountId}
          data-application-id
          data-embed="default"
          data-player={playerId}
          data-video-id={videoId}
        />
      </div>
    );
  }
}

BrightcoveVideo.globalErrors = [];

BrightcoveVideo.propTypes = { poster: SourcePropType, ...propTypes };
BrightcoveVideo.defaultProps = defaults;

export default BrightcoveVideo;
