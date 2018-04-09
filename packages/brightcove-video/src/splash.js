import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet } from "react-native";
import { addMissingProtocol } from "@times-components/utils";
import PlayIcon from "./play-icon";

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const addMissingProtocolToPoster = poster => ({
  uri: addMissingProtocol(poster.uri)
});

const Splash = ({ poster, width, height, playIcon }) => (
  <View
    style={{ width, height }}
    testID="splash-component"
    accessibilityLabel="splash-component"
  >
    {poster ? (
      <Image
        source={addMissingProtocolToPoster(poster)}
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
      <PlayIcon icon={playIcon} />
    </View>
  </View>
);

Splash.defaultProps = {
  poster: null,
  playIcon: null
};

Splash.propTypes = {
  poster: PropTypes.shape({ uri: PropTypes.string.isRequired }),
  playIcon: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Splash;
