/* eslint-env browser */
import React, { Component } from "react";
import { propTypes, defaultProps } from "./video-prop-types";

const css = `
.video-js .vjs-big-play-button {
  width: 70px;
  height: 70px;
  margin-top: -35px;
  margin-left: -35px;

  background: rgba(0, 0, 0, 0.4);

  line-height: 65px;

  border-radius: 0;
  border-style: solid;
  border-width: 3px;
  border-color: white;
}

.video-js .vjs-big-play-button:before, .video-js .vjs-icon-placeholder:before {
  font-size: 60px;
  left: -2px;
}

.video-js .vjs-dock-text {
  visibility: hidden;
}

.video-js .vjs-poster {
  background-size: cover;
}
`;

class InlineVideoPlayer extends Component {
  static index = 0;
  static scriptLoadError = false;
  static activePlayers = [];
  static brightcoveSDKLoadedStarted = false;

  static brightcoveSDKHasLoaded() {
    return !!(window.bc && window.videojs);
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static attachStyles() {
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    const cssText = document.createTextNode(css);
    styleTag.appendChild(cssText);
    document.head.appendChild(styleTag);
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    InlineVideoPlayer.index += 1;
    this.id = `${props.videoId}-${props.accountId}-${InlineVideoPlayer.index}`;
  }

  componentDidMount() {
    if (InlineVideoPlayer.scriptLoadError) {
      this.handleError(InlineVideoPlayer.scriptLoadError);
    }

    this.loadBrightcoveSDKIfRequired();

    InlineVideoPlayer.activePlayers.push(this);

    if (InlineVideoPlayer.brightcoveSDKHasLoaded()) {
      this.initBrightcove();
    }
  }

  componentWillUnmount() {
    InlineVideoPlayer.activePlayers.splice(
      InlineVideoPlayer.activePlayers.indexOf(this)
    );
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  handleError = () => {
    this.setState({ error: true });
  };

  handlePlay = () => {
    InlineVideoPlayer.activePlayers.forEach(video => {
      if (video !== this && video.player) {
        video.player.pause();
      }
    });
  };

  loadBrightcoveSDKIfRequired() {
    if (!InlineVideoPlayer.brightcoveSDKLoadedStarted) {
      InlineVideoPlayer.brightcoveSDKLoadedStarted = true;

      const s = this.createBrightcoveScript();

      s.onload = () => {
        InlineVideoPlayer.activePlayers.forEach(player => player.initVideojs());
      };

      s.onerror = () => {
        InlineVideoPlayer.scriptLoadError = "Brightcove script failed to load";
        InlineVideoPlayer.activePlayers.forEach(player => player.handleError());
      };

      InlineVideoPlayer.appendScript(s);
      InlineVideoPlayer.attachStyles();
    }
  }

  createBrightcoveScript() {
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${this.props.accountId}/${
      this.props.playerId
    }_default/index.min.js`;

    return s;
  }

  initVideojs() {
    this.player = window.videojs(this.id);
    this.player.ready(() => {
      this.player.contextmenu({ disabled: true });
    });
    this.player.on("error", this.handleError);
    this.player.on("play", this.handlePlay);
  }

  initBrightcove() {
    window.bc(document.getElementById(this.id));

    this.initVideojs();
  }

  render() {
    const { width, height, poster, videoId, accountId, playerId } = this.props;

    if (this.state.error) {
      throw new Error(); // caught by parent ErrorView
    }

    return (
      /* eslint jsx-a11y/media-has-caption: "off" */
      // Added a wrapping div as brightcove adds siblings to the video tag
      <div data-testid="video-component" style={{ height, width }}>
        <video
          id={this.id}
          style={{ height, width }}
          {...(poster ? { poster: this.props.poster.uri } : {})}
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

InlineVideoPlayer.defaultProps = defaultProps;
InlineVideoPlayer.propTypes = propTypes;

export default InlineVideoPlayer;
