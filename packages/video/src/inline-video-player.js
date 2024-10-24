/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { appendToImageURL } from "@times-components/utils";
import { propTypes, defaultProps } from "./video-prop-types";
import Video360Icon from "./video-360-icon";
import videoPlayIcon from "../assets/video-play-icon";

const css = `
  div[data-is-360="true"] button.vjs-big-play-button {
    display: none !important;
  }

  .video-js .vjs-big-play-button {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: unset !important;
  }

  .video-js .vjs-dock-text {
    visibility: hidden;
  }

  .video-js .vjs-poster {
    background-size: cover;
  }

  .video-js .vjs-tech {
    position: relative;
  }

  .vjs-big-play-button .vjs-icon-placeholder::before, .vjs-big-play-button .vjs-icon-placeholder::after {
    content: "" !important;

    position: absolute;
    top: unset !important;
    bottom: 0;
    left: 0;
    
    background-image: url(${videoPlayIcon.base});
    background-size: contain;
    background-repeat: no-repeat;
    
    aspect-ratio: 1 !important;
    width: 25% !important;
    height: unset !important;
    min-width: 80px;
    min-height: 80px;
    max-width: 128px;
    max-height: 128px;
    transition: opacity 100ms ease-in-out;
  }

  .vjs-big-play-button .vjs-icon-placeholder::before {
    background-image: url(${videoPlayIcon.base});
    opacity: 1;
  }

  .vjs-big-play-button .vjs-icon-placeholder::after {
    background-image: url(${videoPlayIcon.hover});
    opacity: 0;
  }

  .vjs-big-play-button:hover .vjs-icon-placeholder::before {
      opacity: 0;
  }
  .vjs-big-play-button:hover .vjs-icon-placeholder::after {
      opacity: 1;
  }
  .vjs-big-play-button:focus .vjs-icon-placeholder::before {
    background-image: url(${videoPlayIcon.hover});
  }

  .vjs-big-play-button:focus {
   outline: none;
  }

  .video-js.vjs-has-started  .vjs-big-play-button .vjs-icon-placeholder::before, .video-js.vjs-has-started  .vjs-big-play-button .vjs-icon-placeholder::after {
    display: none !important;
  }
`;

class InlineVideoPlayer extends Component {
  static scriptLoadError = false;

  static activePlayers = [];

  static activeScripts = [];

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
      error: null,
      hasVideoPlayed: false
    };

    this.id = `${props.videoId}-${props.accountId}-${props.id}`;
    this.videoContainerRef = React.createRef();
    this.observer = null;
  }

  componentDidMount() {
    this.observer = this.createIntersectionObserver();
    if (this.observer && this.videoContainerRef) {
      this.observer.observe(this.videoContainerRef.current);
    }

    this.loadBrightcoveSDKIfRequired();

    if (InlineVideoPlayer.scriptLoadError) {
      this.handleError(InlineVideoPlayer.scriptLoadError);
    }

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

    if (this.observer) {
      this.observer.disconnect();
    }
  }

  handleError = () => {
    this.setState({ error: true });
  };

  handlePlay = () => {
    this.setState({ hasVideoPlayed: true });

    InlineVideoPlayer.activePlayers.forEach(video => {
      if (video !== this && video.player) {
        video.player.pause();
      }
    });
  };

  createIntersectionObserver() {
    return "IntersectionObserver" in window
      ? new window.IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            this.loadBrightcoveSDKIfRequired();
          }
        })
      : null;
  }

  loadBrightcoveSDKIfRequired() {
    const s = this.createBrightcoveScript();

    if (s) {
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
    const { accountId, playerId, videoId } = this.props;
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js?videoID=${videoId}`;
    s.defer = true;

    if (InlineVideoPlayer.activeScripts.includes(s.src)) {
      return null;
    }

    InlineVideoPlayer.activeScripts.push(s.src);
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
    const {
      width,
      height,
      poster,
      videoId,
      accountId,
      playerId,
      is360
    } = this.props;
    const { error, hasVideoPlayed } = this.state;
    if (error) {
      throw new Error("Can't load video"); // caught by parent ErrorView
    }

    return (
      /* eslint jsx-a11y/media-has-caption: "off" */
      <div
        data-is-360={is360}
        data-testid="video-component"
        ref={this.videoContainerRef}
        style={{ height, width }}
        className="lcpItem"
      >
        <div style={{ height, width, position: "relative" }}>
          {!hasVideoPlayed && <Fragment>{is360 && <Video360Icon />}</Fragment>}
          <video
            id={this.id}
            style={{ height, width }}
            {...(poster
              ? { poster: appendToImageURL(poster.uri, "resize", 960) }
              : {})}
            className="video-js"
            controls
            data-account={accountId}
            data-application-id
            data-embed="default"
            data-player={playerId}
            data-video-id={videoId}
          />
        </div>
      </div>
    );
  }
}

InlineVideoPlayer.defaultProps = defaultProps;
InlineVideoPlayer.propTypes = propTypes;

export default InlineVideoPlayer;
