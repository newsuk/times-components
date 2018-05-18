import React, { Component } from "react";
import { Text, View } from "react-native";
import Gradient from "@times-components/gradient";
import { IconTwitter } from "@times-components/icons";
import Image from "@times-components/image";
import { TextLink } from "@times-components/link";
import { renderTrees } from "@times-components/markup";
import AuthorHeadContainer from "./author-head-container";
import { propTypes, defaultProps } from "./author-profile-head-prop-types";
import authorProfileHeadTrackingEvents from "./author-profile-head-tracking-events";
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

    const renderTwitterLink = () => {
      if (!twitter) return null;

      const twitterUrl = `https://twitter.com/${twitter}`;

      return (
        <View style={styles.twitter}>
          <IconTwitter width={15} height={15} />
          <TextLink
            style={styles.twitterLink}
            url={twitterUrl}
            onPress={e => onTwitterLinkPress(e, { twitter, twitterUrl })}
          >
            @{twitter}
          </TextLink>
        </View>
      );
    };

    return (
      <AuthorHeadContainer>
        {uri ? (
          <Image uri={uri} style={styles.authorPhoto} aspectRatio={1} />
        ) : null}
        {name ? (
          <Text
            accessibilityLabel="author-name"
            accessibilityRole="heading"
            style={styles.name}
            testID="author-name"
          >
            {name}
          </Text>
        ) : null}
        {jobTitle ? (
          <Text
            accessibilityRole="heading"
            aria-level="2"
            style={styles.jobTitle}
          >
            {jobTitle.toLowerCase()}
          </Text>
        ) : null}
        {renderTwitterLink()}
        {biography ? (
          <View style={styles.biographyContainer}>
            <Text testID="author-bio" style={styles.biography}>
              {renderTrees(biography)}
            </Text>
          </View>
        ) : null}
      </AuthorHeadContainer>
    );
  }
}

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default authorProfileHeadTrackingEvents(AuthorProfileHead);
