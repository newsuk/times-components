import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { colours, fonts } from "@times-components/styleguide";

const { propTypes: { style: TextPropTypesStyle } } = Text;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bodyRegularSmallCaps,
    fontSize: 14,
    color: colours.functional.secondary
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
