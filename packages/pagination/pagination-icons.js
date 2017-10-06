import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import Svg, { G, Path } from "svgs";

const textStyle = {
  height: 15,
  fontFamily: "GillSansMTStd-Medium",
  fontSize: 15,
  color: "#006699",
  ...Platform.select({
    web: {
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    }
  })
};

const container = {
  flexDirection: "row",
  paddingLeft: 10,
  ...Platform.select({
    web: {
      alignItems: "flex-start"
    },
    android: {
      alignItems: "flex-end"
    },
    ios: {
      alignItems: "flex-start"
    }
  })
};

const styles = StyleSheet.create({
  nextContainer: Object.assign(
    {
      paddingRight: 12
    },
    container
  ),
  previousContainer: Object.assign(
    {
      paddingLeft: 12
    },
    container
  ),
  nextText: Object.assign(
    {
      textAlign: "right",
      paddingRight: 10
    },
    textStyle
  ),
  previousText: Object.assign(
    {
      textAlign: "left",
      paddingLeft: 10
    },
    textStyle
  )
});

export const NextPageIcon = props => (
  <View style={styles.nextContainer}>
    <Text style={styles.nextText}>{props.label}</Text>
    <Svg width={12} height={12} viewBox="0 0 144 144">
      <G fill="#006699">
        <Path d="M45.8,132L42,128.2,74.8,72,42,15.8,45.8,12,102,72Z" />
      </G>
    </Svg>
  </View>
);

export const PreviousPageIcon = props => (
  <View style={styles.previousContainer}>
    <Svg width={12} height={12} viewBox="0 0 144 144">
      <G fill="#006699">
        <Path d="M98.2,12l3.8,3.8L69.2,72,102,128.2,98.2,132,42,72Z" />
      </G>
    </Svg>
    <Text style={styles.previousText}>{props.label}</Text>
  </View>
);

NextPageIcon.propTypes = {
  label: PropTypes.string.isRequired
};

PreviousPageIcon.propTypes = {
  label: PropTypes.string.isRequired
};
