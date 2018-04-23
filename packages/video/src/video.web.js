import React from "react";
import Image from "@times-components/image";

import InlineVideoPlayer from "./inline-video-player";
import IsPaidSubscriber from "./is-paid-subscriber";
import { propTypes, defaultProps } from "./video.proptypes";

export const isPaidOnly = paidOnlyValue =>
  paidOnlyValue === "false" ? false : !!paidOnlyValue;

const Video = props => {
  const { paidOnly, width, height, poster } = props;
  return (
    <IsPaidSubscriber.Consumer>
      {isPaidSubscriber =>
        isPaidOnly(paidOnly) && !isPaidSubscriber ? (
          <Image style={{ width, height }} uri={poster.uri} />
        ) : (
          <InlineVideoPlayer {...props} />
        )
      }
    </IsPaidSubscriber.Consumer>
  );
};

Video.defaultProps = defaultProps;
Video.propTypes = propTypes;

export default Video;
