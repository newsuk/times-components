import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

const errorStyling = StyleSheet.create({
  heading: {
    fontFamily: "TimesModern-Bold",
    fontSize: "20px",
    textAlign: "center",
    color: "white",
    width: "auto !important",
    height: "auto !important",
    marginBottom: spacing(2)
  },
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  }
});

const TextBody = withResponsiveStyles(Text, {
  base: () => `
      font-family: TimesDigitalW04;
      font-size: 14px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      width: 259px !important;
      height: auto !important;
  `,
  wideUp: () => `
      width: 340px !important;
  `
});

const VideoError = ({ width, height }) => (
  <View style={[errorStyling.background, { width, height }]}>
    <Text style={errorStyling.heading}>Something&apos;s gone wrong</Text>
    <TextBody>
      Please check your network{"\n"}connection and refresh the page
    </TextBody>
  </View>
);

VideoError.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
