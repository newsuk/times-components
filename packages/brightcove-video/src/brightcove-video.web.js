import React, { Component } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

import VideoError from "./video-error";
import IsPaidSubscriber from "./is-paid-subscriber";


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
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  handleError = (error) => {
    this.setState({ error });
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    const { paidonly, width, height, poster } = this.props;

    if (this.state.error) {
      return <VideoError {...this.props} onReset={this.reset} />;
    }

    return (
      <IsPaidSubscriber.Consumer>
        {isPaidSubscriber =>
          paidonly && !isPaidSubscriber ? (
            <Image style={{ width, height }} source={poster} />
          ) : (
              <Player
                ref={ref => {
                  this.playerRef = ref;
                }}
                {...this.props}
                onError={this.handleError}
                onFinish={this.handleFinish}
              />
            )
        }
      </IsPaidSubscriber.Consumer>
    );
  }
}

const numberOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

BrightcoveVideo.propTypes = {
  accountId: PropTypes.string.isRequired,
  playerId: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  policyKey: PropTypes.string.isRequired,
  posterImageUri: PropTypes.string,
  paidonly: PropTypes.bool,
  width: numberOrString.isRequired,
  height: numberOrString.isRequired,
  onError: PropTypes.func
};

BrightcoveVideo.defaultProps = {
  paidonly: false,
  onError: null,
  playerId: "default"
};

export default BrightcoveVideo;



class Player extends Component {

  static globalErrors = [];

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

    index += 1;

    Player.globalErrors.forEach(this.props.onError);

    this.state = {
      id: `${props.videoId}-${props.accountId}-${index}`,
      errors: [].concat(Player.globalErrors),
      isPlaying: "paused",
      isFinished: false,
      progress: 0
    };
  }

  componentDidMount() {
    if (this.state.errors.length) {
      return;
    }

    // only ever append script once
    if (!Player.players) {
      Player.players = [];

      const s = this.createBrightcoveScript();

      s.onload = () => {
        Player.players.forEach(player =>
          player.initVideojs(player.state.id)
        );
      };

      // handle script not loading
      s.onerror = err => {
        const uriErr = {
          code: "",
          message: `The script ${err.target.src} is not accessible.`
        };

        Player.globalErrors.push(uriErr);

        this.props.onError(uriErr);
      };

      Player.appendScript(s);
      Player.attachStyles();
    }

    this.init();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  onError(player) {
    if (this.props.onError) {
      this.props.onError(player.error());
    }
  }

  createBrightcoveScript() {
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${this.props.accountId}/${
      this.props.playerId
      }_default/index.min.js`;

    return s;
  }

  initVideojs(id) {
    this.player = videojs(id);
    this.player.ready(() => {
      this.player.contextmenu({ disabled: true });
    });
    this.player.on("error", () => this.onError(this.player));
  }

  initBrightcove(id) {
    bc(document.getElementById(id), {
      // TODO remove?
      controlBar: {
        fullscreenToggle: !this.props.hideFullScreenButton
      }
    });

    this.initVideojs(id);
  }

  init() {
    if (window.bc && window.videojs) {
      this.initBrightcove(this.state.id);
    } else {
      Player.players.push(this);
    }
  }

  render() {
    /* eslint jsx-a11y/media-has-caption: "off" */
    // Added a wrapping div as brightcove adds siblings to the video tag
    return (
      <div style={{ width: this.props.width, height: this.props.height }}>
        <video
          id={this.state.id}
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
}

