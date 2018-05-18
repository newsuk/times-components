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
import {
  AuthorNameWrapper,
  BioContainer,
  ImageContainer
} from "./styles/responsive";

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
        <ImageContainer>
          <Image uri={uri} style={styles.authorPhoto} aspectRatio={1} />
        </ImageContainer>
        <AuthorNameWrapper
          accessibilityLabel="author-name"
          accessibilityRole="heading"
          aria-level="1"
          testID="author-name"
        >
          {name}
        </AuthorNameWrapper>
        <Text
          accessibilityRole="heading"
          aria-level="2"
          style={styles.jobTitle}
        >
          {jobTitle && jobTitle.toLowerCase()}
        </Text>
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
        <BioContainer>
          <Text testID="author-bio" style={styles.biography}>
            {renderTrees(biography)}
          </Text>
        </BioContainer>
      </AuthorHeadContainer>
    );
  }
}

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default authorProfileHeadTrackingEvents(AuthorProfileHead);
