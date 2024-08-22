import React, { useState, useEffect, useRef, Fragment } from "react";
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

const InlineVideoPlayer = (props) => {
  const [error, setError] = useState(null);
  const [hasVideoPlayed, setHasVideoPlayed] = useState(false);
  const videoContainerRef = useRef(null);
  const id = `${props.videoId}-${props.accountId}-${props.id}`;
  let player = null;
  let observer = null;

  useEffect(() => {
    observer = createIntersectionObserver();
    if (observer && videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    } else {
      loadBrightcoveSDKIfRequired();
    }

    if (InlineVideoPlayer.scriptLoadError) {
      handleError(InlineVideoPlayer.scriptLoadError);
    }

    InlineVideoPlayer.activePlayers.push(this);

    if (InlineVideoPlayer.brightcoveSDKHasLoaded()) {
      initBrightcove();
    }

    return () => {
      InlineVideoPlayer.activePlayers.splice(
        InlineVideoPlayer.activePlayers.indexOf(this)
      );
      if (player) {
        player.dispose();
        player = null;
      }

      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleError = () => {
    setError(true);
  };

  const handlePlay = () => {
    setHasVideoPlayed(true);

    InlineVideoPlayer.activePlayers.forEach(video => {
      if (video !== this && video.player) {
        video.player.pause();
      }
    });
  };

  const createIntersectionObserver = () => {
    return "IntersectionObserver" in window
      ? new window.IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            loadBrightcoveSDKIfRequired();
          }
        })
      : null;
  };

  const loadBrightcoveSDKIfRequired = () => {
    if (!InlineVideoPlayer.brightcoveSDKLoadedStarted) {
      InlineVideoPlayer.brightcoveSDKLoadedStarted = true;

      const s = createBrightcoveScript();

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
  };

  const createBrightcoveScript = () => {
    const { accountId, playerId } = props;
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
    s.defer = true;

    return s;
  };

  const initVideojs = () => {
    player = window.videojs(id);
    player.ready(() => {
      player.contextmenu({ disabled: true });
    });
    player.on("error", handleError);
    player.on("play", handlePlay);
  };

  const initBrightcove = () => {
    window.bc(document.getElementById(id));

    initVideojs();
  };

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    const cssText = document.createTextNode(css);
    styleTag.appendChild(cssText);
    document.head.appendChild(styleTag);
  }, []);

  const {
    width,
    height,
    poster,
    videoId,
    accountId,
    playerId,
    is360
  } = props;

  if (error) {
    throw new Error("Can't load video"); // caught by parent ErrorView
  }

  return (
    <div
      data-is-360={is360}
      data-testid="video-component"
      ref={videoContainerRef}
      style={{ height, width }}
      className="lcpItem"
    >
      <div style={{ height, width, position: "relative" }}>
        {!hasVideoPlayed && <Fragment>{is360 && <Video360Icon />}</Fragment>}
        <video
          id={id}
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
};

InlineVideoPlayer.defaultProps = defaultProps;
InlineVideoPlayer.propTypes = propTypes;

export default InlineVideoPlayer;