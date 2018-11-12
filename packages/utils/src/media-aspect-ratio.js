import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

const AspectRatioContainer = ({ aspectRatio, children }) => {
  const [ratioWidth, ratioHeight] = aspectRatio.split(":");
  const aspectRatioPercent = (ratioHeight / ratioWidth) * 100;
  return (
    <View
      style={{ paddingBottom: `${aspectRatioPercent}%`, position: "relative" }}
    >
      <View style={{ height: "100%", position: "absolute", width: "100%" }}>
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
