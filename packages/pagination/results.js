import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import ResultsMessage from "./results-message";

const styles = StyleSheet.create({
  messageContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 50
  }
});

const Results = ({ children: message }) => (
  <View style={styles.messageContainer}>
    <ResultsMessage>{message}</ResultsMessage>
  </View>
);

Results.propTypes = {
  children: PropTypes.string.isRequired
};

export default Results;
