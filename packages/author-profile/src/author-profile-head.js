import React, { Component } from "react";
import { Text, View } from "react-native";
import Image from "@times-components/image";
import { renderTrees } from "@times-components/markup";
import { Animations, spacing } from "@times-components/styleguide";
import { propTypes, defaultProps } from "./author-profile-head-prop-types";
import AuthorProfileHeadLoading from "./author-profile-head-loading";
import AuthorProfileHeadJobTitle from "./author-profile-head-jobtitle";
import AuthorProfileHeadTwitter from "./author-profile-head-twitter";
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
        <View pointerEvents="box-none" style={styles.authorHeadWrapper}>
          <View
            accessibilityRole="banner"
            style={[styles.authorHeadContainer, { paddingTop: spacing(6) }]}
          >
            {!!uri && (
              <Image aspectRatio={1} style={styles.authorPhoto} uri={uri} />
            )}
            {!!name && (
              <Text
                accessibilityLabel="author-name"
                accessibilityRole="heading"
                style={styles.name}
                testID="author-name"
              >
                {name}
              </Text>
            )}
            {!!jobTitle && <AuthorProfileHeadJobTitle jobTitle={jobTitle} />}
            {renderTwitterLink()}
            {!!biography && (
              <View style={styles.biographyContainer}>
                <Text testID="author-bio" style={styles.biography}>
                  {renderTrees(biography)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Animations.FadeIn>
    );
  }
}

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default authorProfileHeadTrackingEvents(AuthorProfileHead);
