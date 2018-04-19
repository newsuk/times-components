import React from "react";
import { Image } from "react-native";

import InlineVideoPlayer from "./inline-video-player";
import IsPaidSubscriber from "./is-paid-subscriber";
import { propTypes, defaultProps } from "./brightcove-video.proptypes";

const BrightcoveVideo = props => {
  const { paidonly, width, height, poster } = props;
  return (
    <IsPaidSubscriber.Consumer>
      {isPaidSubscriber =>
        paidonly && !isPaidSubscriber ? (
          <Image style={{ width, height }} source={poster} />
        ) : (
          <InlineVideoPlayer {...props} />
        )
      }
    </IsPaidSubscriber.Consumer>
  );
};

BrightcoveVideo.defaultProps = defaultProps;
BrightcoveVideo.propTypes = propTypes;

export default BrightcoveVideo;
