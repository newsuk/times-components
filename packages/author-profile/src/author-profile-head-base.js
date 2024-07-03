import React, { memo } from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { Animations } from "@times-components/ts-styleguide";
import AuthorProfileHeadJobTitle from "./author-profile-head-jobtitle";
import AuthorProfileHeadTwitter from "./author-profile-head-twitter";
import styles from "./styles";

const AuthorProfileHeadBase = memo(
  ({
    jobTitle,
    onTwitterLinkPress,
    renderBiography,
    renderImage,
    renderName,
    twitter
  }) => {
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
        <TcView style={styles.authorHeadWrapper} data-testid="author-head">
          {renderImage()}
          {renderName()}
          {renderJobTitle()}
          {renderTwitterLink()}
          {renderBiography()}
        </TcView>
      </Animations.FadeIn>
    );
  }
);

AuthorProfileHeadBase.propTypes = {
  jobTitle: PropTypes.string,
  onTwitterLinkPress: PropTypes.func,
  renderBiography: PropTypes.func.isRequired,
  renderImage: PropTypes.func.isRequired,
  renderName: PropTypes.func.isRequired,
  twitter: PropTypes.string
};

AuthorProfileHeadBase.defaultProps = {
  jobTitle: "",
  onTwitterLinkPress: () => {},
  twitter: ""
};

export default AuthorProfileHeadBase;
