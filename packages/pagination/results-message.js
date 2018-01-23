import React from "react";
import { Colors } from "@times-components/styleguide"
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  message: {
    color: Colours.midGrey,
    fontFamily: "GillSansMTStd-Medium",
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
