import React from "react";
import { Text, View } from "react-native";
import { propTypes, defaultProps } from "./author-profile-head-prop-types";
import AuthorProfileHeadBaseWithTracking from "./author-profile-head-base";
import AuthorProfileHeadBiography from "./author-profile-head-biography";
import AuthorProfileHeadImage from "./author-profile-head-image";
import styles from "./styles";

const AuthorProfileHead = ({
  biography,
  isLoading,
  jobTitle,
  name,
  onTwitterLinkPress,
  twitter,
  uri
}) => {
  const renderBiography = () => {
    if (!biography) return null;
    return (
      <View style={styles.biographyContainer}>
        <AuthorProfileHeadBiography biography={biography} />
      </View>
    );
  };

  const renderImage = () => {
    if (!uri) return null;
    return <AuthorProfileHeadImage uri={uri} />;
  };

  const renderName = () => {
    if (!name) return null;
    return (
      <Text accessibilityRole="header" style={styles.name} testID="author-name">
        {name}
      </Text>
    );
  };

  return (
    <View
      style={[styles.authorHeadContainer, styles.authorHeadContainerNative]}
    >
      <AuthorProfileHeadBaseWithTracking
        isLoading={isLoading}
        jobTitle={jobTitle}
        onTwitterLinkPress={onTwitterLinkPress}
        renderBiography={renderBiography}
        renderImage={renderImage}
        renderName={renderName}
        twitter={twitter}
      />
    </View>
  );
};

AuthorProfileHead.propTypes = propTypes;
AuthorProfileHead.defaultProps = defaultProps;

export default AuthorProfileHead;
