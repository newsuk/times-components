import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fonts } from "@times-components/styleguide";

import ResetIcon from "./reset-icon";

const SourcePropType = Image.propTypes.source;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  errorHead: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
    fontFamily: fonts.headline
  },
  errorBody: {
    color: "white",
    textAlign: "center",
    marginBottom: 15,
    opacity: 0.8,
    fontSize: 14,
    fontFamily: fonts.body
  },
  resetButton: {
    flexDirection: "row",
    backgroundColor: "#006699",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 2
  },
  resetText: {
    color: "white",
    fontFamily: fonts.supporting,
    fontSize: 13,
    lineHeight: 15,
    position: "relative",
    top: 3,
    letterSpacing: 1,
    paddingLeft: 5
  }
});

const VideoError = ({ poster, width, height, onReset }) => (
  <View testID="error-component" accessibilityLabel="error-component">
    {poster ? (
      <Image
        source={poster}
        style={{
          width,
          height
        }}
      />
    ) : (
      <View
        style={{
          width,
          height,
          backgroundColor: "black"
        }}
      />
    )}
    <View style={[styles.overlay, { width, height }]}>
      <Text style={styles.errorHead}>Something’s gone wrong</Text>
      <Text style={styles.errorBody}>
        Please check your network connection{"\n"}and tap retry to continue
      </Text>
      <TouchableOpacity onPress={onReset}>
        <View style={styles.resetButton}>
          <ResetIcon width={15} />
          <Text style={styles.resetText}>RETRY</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

VideoError.defaultProps = {
  poster: null
};

VideoError.propTypes = {
  onReset: PropTypes.func.isRequired,
  poster: SourcePropType,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
