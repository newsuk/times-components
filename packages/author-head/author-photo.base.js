import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import withResponsiveStyles from "@times-components/responsive-styles";

const { propTypes: { style: TextPropTypesStyle } } = Text;

const styles = StyleSheet.create({
  authorPhoto: {
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#FFF",
    overflow: "hidden",
    marginBottom: 20
  }
});

const AuthorPhoto = ({ uri, style }) => {
  if (!uri) {
    return null;
  }

  return (
    <Image uri={uri} style={[styles.authorPhoto, style]} aspectRatio={1} />
  )
}

AuthorPhoto.defaultProps = {
  uri: "",
  style: {}
};

AuthorPhoto.propTypes = {
  uri: PropTypes.string,
  style: TextPropTypesStyle
};

export default AuthorPhoto;
