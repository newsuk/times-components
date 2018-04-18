import React, { Component } from "react";

import { propTypes, defaultProps } from "./brightcove-video.proptypes";

import VideoError from "./video-error";

const styles = `
.video-js .vjs-big-play-button {
  width: 70px;
  height: 70px;
  margin-top: -35px;
  margin-left: -35px;

  background: rgba(0, 0, 0, 0.4);

  line-height: 1.65em;

  border-radius: 0;
  border-style: solid;
  border-width: 3px;
  border-color: white;
}

.video-js .vjs-big-play-button:before {
  font-size: 60px;
  left: -2px;
  top: -8px;
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

  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    InlineVideoPlayer.index += 1;
    this.id = `${props.videoId}-${props.accountId}-${InlineVideoPlayer.index}`;
    if (InlineVideoPlayer.scriptLoadError) {
      this.handleError(InlineVideoPlayer.scriptLoadError);
    }
  }

  handleError = () => {
    // TODO: check that brightcove logs the error
    this.setState({ error: true });
  }

  handlePlay = () => {
    InlineVideoPlayer.activePlayers.forEach(video => {
      if (video !== this && video.player) {
        video.player.pause();
      }
    })
  }

  render() {
    const { paidonly, width, height, poster } = this.props;

    if (this.state.error) {
      return <VideoError {...this.props} />;
    }

    return (
      /* eslint jsx-a11y/media-has-caption: "off" */
      // Added a wrapping div as brightcove adds siblings to the video tag
      <div style={{ width: this.props.width, height: this.props.height }}>
        <video
          id={this.id}
          style={{ width: this.props.width, height: this.props.height }}
          {...(this.props.poster ? { poster: this.props.poster.uri } : {})}
          data-embed="default"
          data-video-id={this.props.videoId}
          data-account={this.props.accountId}
          data-player={this.props.playerId}
          // following 'autoplay' can not expected to always work on web
          // see: https://docs.brightcove.com/en/player/brightcove-player/guides/in-page-embed-player-implementation.html
          autoPlay={this.props.autoplay}
          data-application-id
          className="video-js"
          controls
        />
      </div>
    );
  }

  componentDidMount() {
    if (InlineVideoPlayer.scriptLoadError) {
      return;
    }

    this.loadBrightcoveSDKIfRequired();

    InlineVideoPlayer.activePlayers.push(this);

    if (this.brightcoveSDKHasLoaded()) {
      this.initBrightcove();
    }
  }

  loadBrightcoveSDKIfRequired() {
    if (!InlineVideoPlayer.brightcoveSDKLoadedStarted) {
      InlineVideoPlayer.brightcoveSDKLoadedStarted = true;

      const s = this.createBrightcoveScript();

      s.onload = () => {
        InlineVideoPlayer.activePlayers.forEach(player => player.initVideojs());
      };

      // handle script not loading
      s.onerror = err => {
        const uriErr = {
          code: "",
          message: `The script ${err.target.src} is not accessible.`
        };

        InlineVideoPlayer.scriptLoadError = "Brightcove script failed to load";
      };

      InlineVideoPlayer.appendScript(s);
      InlineVideoPlayer.attachStyles();
    }
  }

  brightcoveSDKHasLoaded() {
    return !!(window.bc && window.videojs);
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

  createBrightcoveScript() {
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${this.props.accountId}/${
      this.props.playerId
      }_default/index.min.js`;

    return s;
  }


  initVideojs() {
    this.player = videojs(this.id);
    this.player.ready(() => {
      this.player.contextmenu({ disabled: true });
    });
    this.player.on("error", this.handleError);
    this.player.on("play", this.handlePlay);
  }

  initBrightcove() {
    bc(document.getElementById(this.id), {
      // TODO remove?
      controlBar: {
        fullscreenToggle: !this.props.hideFullScreenButton
      }
    });

    this.initVideojs();
  }
}

InlineVideoPlayer.defaultProps = defaultProps;
InlineVideoPlayer.propTypes = propTypes;

export default InlineVideoPlayer;
