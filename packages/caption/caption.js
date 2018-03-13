import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes, Text, StyleSheet, Platform } from "react-native";
import { colours, fonts } from "@times-components/styleguide";

const { style: TextPropTypesStyle } = Text.propTypes;
const { style: ViewPropTypesStyle } = ViewPropTypes;

const lineHeightStyle = Platform.select({
  ios: {
    lineHeight: 16
  },
  android: {
    lineHeight: 20
  },
  web: {
    lineHeight: 17
  }
});

const defaultStyle = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  text: {
    fontFamily: fonts.supporting,
    fontSize: 13,
    color: colours.functional.secondary,
    ...lineHeightStyle
  },
  credits: {
    fontSize: 9,
    color: colours.functional.primary,
    letterSpacing: 1,
    fontWeight: "400",
    ...lineHeightStyle
  }
});

const renderCredits = (style, credits) => {
  if (!credits || credits === "") {
    return null;
  }
  return (
    <Text style={[defaultStyle.text, defaultStyle.credits, style.text]}>
      {credits.toUpperCase()}
    </Text>
  );
};
const renderText = (style, text) => {
  if (!text || text === "") {
    return null;
  }

  return <Text style={[defaultStyle.text, style.text]}>{text}</Text>;
};

const Caption = ({ text, credits, style, children }) => (
  <View>
    {children}
    <View style={[defaultStyle.container, style.container]}>
      {renderText(style, text)}
      {renderCredits(style, credits)}
    </View>
  </View>
);

Caption.defaultProps = {
  text: null,
  credits: null,
  style: {},
  children: null
};

Caption.propTypes = {
  text: PropTypes.string,
  credits: PropTypes.string,
  style: PropTypes.shape({
    text: TextPropTypesStyle,
    container: ViewPropTypesStyle
  }),
  children: PropTypes.element
};

export default Caption;
