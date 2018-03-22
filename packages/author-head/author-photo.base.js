import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { colours, spacing } from "@times-components/styleguide";

const { propTypes: { style: TextPropTypesStyle } } = Text;

const styles = StyleSheet.create({
  authorPhoto: {
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: colours.functional.contrast,
    overflow: "hidden",
    marginBottom: spacing(4)
  }
});

const AuthorPhoto = ({ uri, style }) => {
  if (!uri) {
    return null;
  }

  return (
    <Image uri={uri} style={[styles.authorPhoto, style]} aspectRatio={1} />
  );
};

AuthorPhoto.defaultProps = {
  uri: "",
  style: {}
};

AuthorPhoto.propTypes = {
  uri: PropTypes.string,
  style: TextPropTypesStyle
};

export default AuthorPhoto;
