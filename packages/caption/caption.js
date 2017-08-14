import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import StylePropTypes from "react-style-proptype";

const defaultStyle = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  text: {
    lineHeight: 15,
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 13,
    color: "#696969"
  },
  credits: {
    fontSize: 9,
    marginTop: 2,
    color: "#333",
    letterSpacing: 1,
    fontWeight: "400"
  }
});

const Caption = ({ text, credits, style, children }) =>
  <View>
    {children}
    <View style={[defaultStyle.container, style.container]}>
      <Text style={[defaultStyle.text, style.text]}>{text}</Text>
      {credits &&
        <Text style={[defaultStyle.text, defaultStyle.credits, style.text]}>
          {credits.toUpperCase()}
        </Text>}
    </View>
  </View>;

Caption.defaultProps = {
  credits: null,
  style: {},
  children: null
};

Caption.propTypes = {
  text: PropTypes.string.isRequired,
  credits: PropTypes.string,
  style: PropTypes.shape({
    text: Text.propTypes.style,
    container: StylePropTypes
  }),
  children: PropTypes.element
};

export default Caption;
