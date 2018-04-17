import React, { Component } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

import VideoError from "./video-error";
import IsPaidSubscriber from "./is-paid-subscriber";

const playButtonDimensions = "85px";
const playButtonBorderWidth = "4px";
const playButtonBorderColor = "white";
const styles = `
.vjs-big-play-button {
  width: ${playButtonDimensions};
  height: ${playButtonDimensions};

  background: transparent !important;

  line-height: 1.65em;

  border-radius: 0;
  border-style: solid;
  border-width: ${playButtonBorderWidth};
  border-color: ${playButtonBorderColor};
}

.vjs-big-play-button:before {
  font-size: 77px;
  left: -2px;
}

.vjs-dock-text {
  visibility: hidden;
}

.vjs-poster {
  background-size: cover;
}
`;

class BrightcoveVideo extends Component {

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

    BrightcoveVideo.index += 1;
    this.id = `${props.videoId}-${props.accountId}-${BrightcoveVideo.index}`;
    if (BrightcoveVideo.scriptLoadError) {
      this.handleError(BrightcoveVideo.scriptLoadError);
    }
  }

  handleError = (error) => {
    this.setState({ error });
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
            )
        }
      </IsPaidSubscriber.Consumer>
    );
  }

  componentDidMount() {
    if (BrightcoveVideo.scriptLoadError) {
      return;
    }

    this.loadBrightcoveSDKIfRequired();

    BrightcoveVideo.activePlayers.push(this);

    if (this.brightcoveSDKHasLoaded()) {
      this.initBrightcove();
    }
  }

  loadBrightcoveSDKIfRequired() {
    if (!BrightcoveVideo.brightcoveSDKLoadedStarted) {
      BrightcoveVideo.brightcoveSDKLoadedStarted = true;

      const s = this.createBrightcoveScript();

      s.onload = () => {
        BrightcoveVideo.activePlayers.forEach(player => player.initVideojs());
      };

      // handle script not loading
      s.onerror = err => {
        const uriErr = {
          code: "",
          message: `The script ${err.target.src} is not accessible.`
        };

        BrightcoveVideo.scriptLoadError = "Brightcove script failed to load";
      };

      BrightcoveVideo.appendScript(s);
      BrightcoveVideo.attachStyles();
    }
  }

  brightcoveSDKHasLoaded() {
    return !!(window.bc && window.videojs);
  }

  componentWillUnmount() {
    BrightcoveVideo.activePlayers.splice(
      BrightcoveVideo.activePlayers.indexOf(this)
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
    this.player.on("error", () => this.onError(this.player));
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
  height: numberOrString.isRequired
};

BrightcoveVideo.defaultProps = {
  paidonly: false,
  playerId: "default"
};

export default BrightcoveVideo;
