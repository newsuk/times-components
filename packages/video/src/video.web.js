import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Image from "@times-components/image";
import { fonts, spacing } from "@times-components/styleguide";
import ErrorView from "@times-components/error-view";

import InlineVideoPlayer from "./inline-video-player";
import IsPaidSubscriber from "./is-paid-subscriber";
import VideoError from "./video-error";
import { propTypes, defaultProps } from "./video.proptypes";

export const isPaidOnly = paidOnlyValue =>
  paidOnlyValue === "false" ? false : !!paidOnlyValue;

const styles = StyleSheet.create({
  noSubscriptionWrapper: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 65,
    marginTop: -32
  },
  noSubscriptionMessage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    maxWidth: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#FFFFFF",
    fontFamily: fonts.body,
    padding: spacing(2),
    textAlign: "center"
  }
});

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
                  <Image style={{ width, height }} uri={poster.uri} />
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
