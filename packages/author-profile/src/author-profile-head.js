import React, { Component } from "react";
import { View } from "react-native";
import Gradient from "@times-components/gradient";
import { TextLink } from "@times-components/link";
import { IconTwitter } from "@times-components/icons";
import { withTrackEvents } from "@times-components/tracking";
import AuthorTitle from "./author-title";
import Bio from "./author-bio";
import AuthorName from "./author-name";
import AuthorPhoto from "./author-photo";
import AuthorHeadContainer from "./author-head-container";
import { propTypes, defaultProps } from "./author-profile-head-prop-types";
import styles from "./styles";

class AuthorProfileHead extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isLoading !== nextProps.isLoading;
  }

  render() {
    const {
      biography,
      isLoading,
      jobTitle,
      name,
      onTwitterLinkPress,
      twitter,
      uri
    } = this.props;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingRoundImage}>
            <Gradient style={styles.loadingGradient} />
          </View>
        </View>
      );
    }

    const url = `https://twitter.com/${twitter}`;

    return (
      <AuthorHeadContainer>
        <AuthorPhoto uri={uri} />
        <AuthorName name={name} />
        <AuthorTitle title={jobTitle} />
        <View style={styles.twitter}>
          <IconTwitter width={15} height={15} />
          <TextLink
            style={styles.twitterLink}
            url={url}
            onPress={e => onTwitterLinkPress(e, { twitter, url })}
          >
            @{twitter}
          </TextLink>
        </View>
        <Bio biography={biography} />
      </AuthorHeadContainer>
    );
  }
}

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default withTrackEvents(AuthorProfileHead, {
  analyticsEvents: [
    {
      eventName: "onTwitterLinkPress",
      actionName: "Pressed",
      trackingName: "TwitterLink",
      getAttrs: (props, eventArgs) => ({
        twitterHandle: props.twitter,
        url: eventArgs[1] && eventArgs[1].url
      })
    }
  ]
});
