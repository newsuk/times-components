import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = StyleSheet.create({
  name: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.headline,
    color: colours.functional.brandColour
  }
});

const AuthorName = ({ name }) => (
  <Text
    testID="author-name"
    accessibilityLabel="author-name"
    accessibilityRole="heading"
    style={styles.name}
  >
    {name}
  </Text>
);

AuthorName.propTypes = {
  name: PropTypes.string.isRequired
};

export default AuthorName;
