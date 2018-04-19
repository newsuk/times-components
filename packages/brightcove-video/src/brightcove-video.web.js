import React from "react";
import { Image } from "react-native";

import InlineVideoPlayer from "./inline-video-player";
import IsPaidSubscriber from "./is-paid-subscriber";
import { propTypes, defaultProps } from "./brightcove-video.proptypes";

export const isPaidOnly = paidOnlyValue => paidOnlyValue === "false" ? false : !!paidOnlyValue;

const BrightcoveVideo = props => {
  const { paidOnly, width, height, poster } = props;
  return (
    <IsPaidSubscriber.Consumer>
      {isPaidSubscriber =>
        isPaidOnly(paidOnly) && !isPaidSubscriber ? (
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
