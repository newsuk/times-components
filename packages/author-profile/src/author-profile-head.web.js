import React, { Component } from "react";
import { Text, View } from "react-native";
import Image from "@times-components/image";
import { renderTrees } from "@times-components/markup";
import { Animations } from "@times-components/styleguide";
import { propTypes, defaultProps } from "./author-profile-head-prop-types";
import AuthorProfileHeadLoading from "./author-profile-head-loading";
import AuthorProfileHeadJobTitle from "./author-profile-head-jobtitle";
import AuthorProfileHeadTwitter from "./author-profile-head-twitter";
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
      return <AuthorProfileHeadLoading />;
    }

    const renderTwitterLink = () => {
      if (!twitter) return null;

      const twitterUrl = `https://twitter.com/${twitter}`;

      return (
        <AuthorProfileHeadTwitter
          onTwitterLinkPress={onTwitterLinkPress}
          twitter={twitter}
          url={twitterUrl}
        />
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
            {!!uri && (
              <ImageContainer>
                <Image aspectRatio={1} style={styles.authorPhoto} uri={uri} />
              </ImageContainer>
            )}
            {!!name && (
              <AuthorNameWrapper
                accessibilityLabel="author-name"
                accessibilityRole="heading"
                aria-level="1"
                testID="author-name"
              >
                {name}
              </AuthorNameWrapper>
            )}
            {!!jobTitle && <AuthorProfileHeadJobTitle jobTitle={jobTitle} />}
            {renderTwitterLink()}
            {!!biography && (
              <BioContainer>
                <Text testID="author-bio" style={styles.biography}>
                  {renderTrees(biography)}
                </Text>
              </BioContainer>
            )}
          </AuthorHeadWrapper>
        </View>
      </Animations.FadeIn>
    );
  }
}

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default authorProfileHeadTrackingEvents(AuthorProfileHead);
