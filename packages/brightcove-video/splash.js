import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import PlayIcon from "./play-icon";

const Splash = ({
  poster,
  width,
  height,
  playIcon,
  playIconWidth,
  playIconHeight
}) =>
  <View>
    {poster
      ? <Image
          source={poster}
          style={{
            width,
            height
          }}
        />
      : <View
          style={{
            width,
            height,
            backgroundColor: "black"
          }}
        />}
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
      {playIcon
        ? <Image
            source={playIcon}
            style={{
              width: playIconWidth,
              height: playIconHeight
            }}
          />
        : <PlayIcon width={playIconWidth} height={playIconHeight} />}
    </View>
  </View>;

Splash.defaultProps = {
  poster: null,
  playIcon: null,
  playIconWidth: 70,
  playIconHeight: 70
};
Splash.propTypes = {
  poster: Image.propTypes.source,
  playIcon: Image.propTypes.source,
  playIconWidth: PropTypes.number,
  playIconHeight: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Splash;
