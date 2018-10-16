import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

import ResetIcon from "./reset-icon";

const SourcePropType = Image.propTypes.source;

const styles = StyleSheet.create({
  errorBody: {
    color: "white",
    fontFamily: fonts.body,
    fontSize: fontSizes.meta,
    marginBottom: spacing(3),
    opacity: 0.8,
    textAlign: "center"
  },
  errorHead: {
    color: "white",
    fontFamily: fonts.headline,
    fontSize: fontSizes.smallestHeadline,
    marginBottom: spacing(1)
  },
  overlay: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0
  },
  resetButton: {
    backgroundColor: colours.functional.action,
    borderRadius: 2,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  resetText: {
    color: "white",
    fontFamily: fonts.supporting,
    fontSize: fontSizes.cardMeta,
    letterSpacing: 1,
    lineHeight: 15,
    paddingLeft: spacing(1),
    position: "relative",
    top: 3
  }
});

const VideoError = ({ poster, width, height, onReset }) => (
  <View testID="error-component">
    {poster ? (
      <Image
        source={poster}
        style={{
          height,
          width
        }}
      />
    ) : (
      <View
        style={{
          backgroundColor: "black",
          height,
          width
        }}
      />
    )}
    <View
      style={[
        styles.overlay,
        {
          height,
          width
        }
      ]}
    >
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
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onReset: PropTypes.func.isRequired,
  poster: SourcePropType,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default VideoError;
