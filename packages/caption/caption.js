import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const style = StyleSheet.create({
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

const Caption = ({ text, credits }) =>
  <View style={style.container}>
    <Text style={style.text}> {text} </Text>
    {credits &&
      <Text style={[style.text, style.credits]}>{credits.toUpperCase()}</Text>}
  </View>;

Caption.defaultProps = {
  credits: ""
};

Caption.propTypes = {
  text: PropTypes.string.isRequired,
  credits: PropTypes.string
};

export default Caption;
