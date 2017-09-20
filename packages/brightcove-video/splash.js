import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import PlayIcon from "./play-icon";

const Splash = ({ poster, width, height, playIcon }) => (
  <View testID="splash-component">
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
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <PlayIcon icon={playIcon} />
    </View>
  </View>
);

Splash.defaultProps = {
  poster: null,
  playIcon: null
};

Splash.propTypes = {
  poster: Image.propTypes.source,
  playIcon: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Splash;
