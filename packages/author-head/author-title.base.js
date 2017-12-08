import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const { propTypes: { style: TextPropTypesStyle } } = Text;

const styles = StyleSheet.create({
  title: {
    fontFamily: "TimesDigitalW04-RegularSC",
    fontSize: 14,
    color: "#696969"
  }
});

const Title = ({ title, style }) => (
  <Text
    accessibilityRole="heading"
    aria-level="2"
    style={[styles.title, style]}
  >
    {title && title.toLowerCase()}
  </Text>
);

Title.defaultProps = {
  title: "",
  style: {}
};

Title.propTypes = {
  title: PropTypes.string,
  style: TextPropTypesStyle
};

export default Title;
