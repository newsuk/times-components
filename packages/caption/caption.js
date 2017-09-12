import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Platform } from "react-native";
import StylePropTypes from "react-style-proptype";

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
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 13,
    color: "#696969",
    ...lineHeightStyle
  },
  credits: {
    fontSize: 9,
    color: "#333",
    letterSpacing: 1,
    fontWeight: "400",
    ...lineHeightStyle
  }
});

const Caption = ({ text, credits, style, children }) =>
  <View>
    {children}
    <View style={[defaultStyle.container, style.container]}>
      {text &&
        <Text style={[defaultStyle.text, style.text]}>
          {text}
        </Text>}
      {credits &&
        <Text style={[defaultStyle.text, defaultStyle.credits, style.text]}>
          {credits.toUpperCase()}
        </Text>}
    </View>
  </View>;

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
    text: Text.propTypes.style,
    container: StylePropTypes
  }),
  children: PropTypes.element
};

export default Caption;
