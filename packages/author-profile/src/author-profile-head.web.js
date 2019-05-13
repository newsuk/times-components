import React from "react";
import { propTypes, defaultProps } from "./author-profile-head-prop-types";
import AuthorProfileHeadBaseWithTracking from "./author-profile-head-base";
import AuthorProfileHeadBiography from "./author-profile-head-biography";
import AuthorProfileHeadImage from "./author-profile-head-image";
import styles from "./styles";
import {
  AuthorHeadWrapper,
  AuthorNameWrapper,
  BioContainer,
  ImageContainer
} from "./styles/responsive";

const AuthorProfileHead = ({
  biography,
  isLoading,
  jobTitle,
  name,
  twitter,
  uri
}) => {
  const renderBiography = () => {
    if (!biography) return null;
    return (
      <BioContainer>
        <AuthorProfileHeadBiography biography={biography} />
      </BioContainer>
    );
  };

  const renderImage = () => {
    if (!uri) return null;
    return (
      <ImageContainer>
        <AuthorProfileHeadImage uri={uri} />
      </ImageContainer>
    );
  };

  const renderName = () => {
    if (!name) return null;
    return (
      <AuthorNameWrapper
        accessibilityRole="header"
        aria-level="1"
        testID="author-name"
      >
        {name}
      </AuthorNameWrapper>
    );
  };

  return (
    <AuthorHeadWrapper style={styles.authorHeadContainer}>
      <AuthorProfileHeadBaseWithTracking
        isLoading={isLoading}
        jobTitle={jobTitle}
        renderBiography={renderBiography}
        renderImage={renderImage}
        renderName={renderName}
        twitter={twitter}
      />
    </AuthorHeadWrapper>
  );
};

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default AuthorProfileHead;
