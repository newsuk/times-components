import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Animations } from "@times-components/styleguide";
import AuthorProfileHeadLoading from "./author-profile-head-loading";
import AuthorProfileHeadJobTitle from "./author-profile-head-jobtitle";
import AuthorProfileHeadTwitter from "./author-profile-head-twitter";
import authorProfileHeadTrackingEvents from "./author-profile-head-tracking-events";
import styles from "./styles";

export class AuthorProfileHeadBase extends Component {
  shouldComponentUpdate(nextProps) {
    const { isLoading } = this.props;
    return isLoading !== nextProps.isLoading;
  }

  render() {
    const {
      isLoading,
      jobTitle,
      onTwitterLinkPress,
      renderBiography,
      renderImage,
      renderName,
      twitter
    } = this.props;

    if (isLoading) {
      return <AuthorProfileHeadLoading />;
    }

    const renderJobTitle = () => {
      if (!jobTitle) return null;
      return <AuthorProfileHeadJobTitle jobTitle={jobTitle} />;
    };

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
      <Animations.FadeIn style={{ width: "100%" }}>
        <View
          pointerEvents="box-none"
          style={styles.authorHeadWrapper}
          testID="author-head"
        >
          {renderImage()}
          {renderName()}
          {renderJobTitle()}
          {renderTwitterLink()}
          {renderBiography()}
        </View>
      </Animations.FadeIn>
    );
  }
}

AuthorProfileHeadBase.propTypes = {
  isLoading: PropTypes.bool,
  jobTitle: PropTypes.string,
  onTwitterLinkPress: PropTypes.func,
  renderBiography: PropTypes.func.isRequired,
  renderImage: PropTypes.func.isRequired,
  renderName: PropTypes.func.isRequired,
  twitter: PropTypes.string
};

AuthorProfileHeadBase.defaultProps = {
  isLoading: true,
  jobTitle: "",
  onTwitterLinkPress: () => {},
  twitter: ""
};

export default authorProfileHeadTrackingEvents(AuthorProfileHeadBase);
