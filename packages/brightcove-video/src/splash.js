import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet } from "react-native";
import { addMissingProtocol } from "@times-components/utils";
import PlayIcon from "./play-icon";

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0
  }
});

const addMissingProtocolToPoster = poster => ({
  uri: addMissingProtocol(poster.uri)
});

const Splash = ({ poster, width, height, playIcon }) => (
  <View
    accessibilityLabel="splash-component"
    style={{
      height,
      width
    }}
    testID="splash-component"
  >
    {poster ? (
      <Image
        source={addMissingProtocolToPoster(poster)}
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
      <PlayIcon icon={playIcon} />
    </View>
  </View>
);

Splash.defaultProps = {
  playIcon: null,
  poster: null
};

Splash.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  playIcon: PropTypes.node,
  poster: PropTypes.shape({
    uri: PropTypes.string.isRequired
  }),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Splash;
