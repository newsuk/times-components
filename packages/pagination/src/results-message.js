import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = StyleSheet.create({
  message: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.pagingMeta,
    paddingTop: 4
  }
});

const ResultsMessage = ({ children: message }) => (
  <Text style={[styles.message]} testID="results-message">
    {message}
  </Text>
);

ResultsMessage.propTypes = {
  children: PropTypes.string.isRequired
};

export default ResultsMessage;
