import React, { memo } from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { Animations } from "@times-components/ts-styleguide";
import { useBreakpointKey } from "newskit";
import AuthorProfileHeadLoading from "./author-profile-head-loading";
import AuthorProfileHeadJobTitle from "./author-profile-head-jobtitle";
import AuthorProfileHeadTwitter from "./author-profile-head-twitter";
import authorProfileHeadTrackingEvents from "./author-profile-head-tracking-events";
import styles from "./styles";

const AuthorProfileHeadBase = memo(
  ({
    isLoading,
    jobTitle,
    onTwitterLinkPress,
    renderBiography,
    renderImage,
    renderName,
    twitter,
    contractualTitle
  }) => {
    const breakpoint = useBreakpointKey();
    const isLargeDevice = breakpoint === "lg" || breakpoint === "xl";

    if (isLoading) {
      return <AuthorProfileHeadLoading />;
    }

    const renderJobTitle = () => {
      if (!jobTitle) return null;
      return (
        <AuthorProfileHeadJobTitle
          jobTitle={jobTitle}
          contractualTitle={contractualTitle}
          isLargeDevice={isLargeDevice}
        />
      );
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
  isLoading: PropTypes.bool,
  jobTitle: PropTypes.string,
  onTwitterLinkPress: PropTypes.func,
  renderBiography: PropTypes.func.isRequired,
  renderImage: PropTypes.func.isRequired,
  renderName: PropTypes.func.isRequired,
  twitter: PropTypes.string,
  contractualTitle: PropTypes.string
};

AuthorProfileHeadBase.defaultProps = {
  isLoading: true,
  jobTitle: "",
  onTwitterLinkPress: () => {},
  twitter: ""
};

export default authorProfileHeadTrackingEvents(AuthorProfileHeadBase);
