import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  name: {
    fontFamily: "TimesModern-Bold",
    fontSize: 30,
    color: "#000"
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
