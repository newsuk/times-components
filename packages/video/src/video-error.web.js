import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  heading: {
    fontFamily: "TimesModern-Bold",
    fontSize: "20px",
    textAlign: "center",
    color: "white",
    width: "auto",
    height: "auto",
    marginBottom: spacing(2)
  },
  body: {
    fontFamily: "TimesDigitalW04",
    fontSize: "14px",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    width: 410,
    height: "auto",
    maxWidth: "80%"
  },
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  }
});

const VideoError = ({ width, height }) => (
  <View style={[styles.background, { width, height }]}>
    <Text style={styles.heading}>Video unable to play</Text>
    <Text style={styles.body}>
      Please check your network connection and try refreshing the page. If that
      doesn&apos;t work, please try again later
    </Text>
  </View>
);

VideoError.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
