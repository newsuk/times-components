import React from "react";
import Image from "@times-components/image";
import ErrorView from "@times-components/error-view";
import InlineVideoPlayer from "./inline-video-player";
import IsPaidSubscriber from "./is-paid-subscriber";
import VideoError from "./video-error";
import { propTypes, defaultProps } from "./video-prop-types";
import { NoSubscriptionWrapper, NoSubscriptionMessage } from "./styles";

const Video = props => {
  const { height, poster, width } = props;
  return (
    <ErrorView>
      {({ hasError }) =>
        hasError ? (
          <VideoError height={height} width={width} />
        ) : (
          <IsPaidSubscriber.Consumer>
            {isPaidSubscriber =>
              !isPaidSubscriber ? (
                <div
                  style={{
                    height,
                    width
                  }}
                >
                  <Image aspectRatio={width / height} uri={poster.uri} />
                  <NoSubscriptionWrapper>
                    <NoSubscriptionMessage>
                      We are sorry, you need to be a subscriber to watch this
                      video
                    </NoSubscriptionMessage>
                  </NoSubscriptionWrapper>
                </div>
              ) : (
                <InlineVideoPlayer {...props} />
              )
            }
          </IsPaidSubscriber.Consumer>
        )
      }
    </ErrorView>
  );
};

Video.defaultProps = defaultProps;
Video.propTypes = propTypes;

export default Video;
export const IsPaidSubscriberContext = IsPaidSubscriber.Provider;
