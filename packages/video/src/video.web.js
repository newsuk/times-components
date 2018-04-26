import React from "react";
import { View, Text } from "react-native";
import Image from "@times-components/image";
import ErrorView from "@times-components/error-view";

import InlineVideoPlayer from "./inline-video-player";
import IsPaidSubscriber from "./is-paid-subscriber";
import VideoError from "./video-error";
import { propTypes, defaultProps } from "./video.proptypes";
import styles from "./styles/video.styles.web";

export const isPaidOnly = paidOnlyValue =>
  paidOnlyValue === "false" ? false : !!paidOnlyValue;

const Video = props => {
  const { paidOnly, width, height, poster } = props;
  return (
    <ErrorView>
      {({ hasError }) =>
        hasError ? (
          <VideoError width={width} height={height} />
        ) : (
          <IsPaidSubscriber.Consumer>
            {isPaidSubscriber =>
              isPaidOnly(paidOnly) && !isPaidSubscriber ? (
                <View style={{ width, height }}>
                  <Image aspectRatio={width / height} uri={poster.uri} />
                  <View style={styles.noSubscriptionWrapper}>
                    <Text style={styles.noSubscriptionMessage}>
                      We are sorry, you need to be a subscriber to watch this
                      video
                    </Text>
                  </View>
                </View>
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
