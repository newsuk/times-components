import React, { Component } from "react";
import { Text, View } from "react-native";
import Gradient from "@times-components/gradient";
import { IconTwitter } from "@times-components/icons";
import Image from "@times-components/image";
import { TextLink } from "@times-components/link";
import { renderTrees } from "@times-components/markup";
import { Animations } from "@times-components/styleguide";
import { propTypes, defaultProps } from "./author-profile-head-prop-types";
import authorProfileHeadTrackingEvents from "./author-profile-head-tracking-events";
import styles from "./styles";
import {
  AuthorHeadWrapper,
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
      <Animations.FadeIn>
        <View
          pointerEvents="box-none"
          style={styles.authorHeadWrapper}
          testID="author-head"
        >
          <AuthorHeadWrapper
            accessibilityRole="banner"
            style={styles.authorHeadContainer}
          >
            {uri ? (
              <ImageContainer>
                <Image aspectRatio={1} style={styles.authorPhoto} uri={uri} />
              </ImageContainer>
            ) : null}
            {name ? (
              <AuthorNameWrapper
                accessibilityLabel="author-name"
                accessibilityRole="heading"
                aria-level="1"
                testID="author-name"
              >
                {name}
              </AuthorNameWrapper>
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
              <BioContainer>
                <Text testID="author-bio" style={styles.biography}>
                  {renderTrees(biography)}
                </Text>
              </BioContainer>
            ) : null}
          </AuthorHeadWrapper>
        </View>
      </Animations.FadeIn>
    );
  }
}

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default authorProfileHeadTrackingEvents(AuthorProfileHead);
