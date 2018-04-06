import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

const AspectRatioContainer = ({ aspectRatio, children }) => {
  const [ratioWidth, ratioHeight] = aspectRatio.split(":");
  const aspectRatioPercent = ratioHeight / ratioWidth * 100;
  return (
    <View
      style={{ position: "relative", paddingBottom: `${aspectRatioPercent}%` }}
    >
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        {children}
      </View>
    </View>
  );
};

AspectRatioContainer.propTypes = {
  aspectRatio: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default AspectRatioContainer;
