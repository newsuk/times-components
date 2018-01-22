import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  message: {
    color: "#696969",
    fontFamily: "GillSansW01-Medium",
    fontSize: 15,
    paddingTop: 4
  }
});

const ResultsMessage = ({ children: message }) => (
  <Text style={[styles.message]}>{message}</Text>
);

ResultsMessage.propTypes = {
  children: PropTypes.string.isRequired
};

export default ResultsMessage;
