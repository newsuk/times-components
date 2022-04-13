import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";

const AspectRatioContainer = ({ aspectRatio, children }) => {
  const [ratioWidth, ratioHeight] = aspectRatio.split(":");
  const aspectRatioPercent = (ratioHeight / ratioWidth) * 100;
  return (
    <TcView
      style={{ paddingBottom: `${aspectRatioPercent}%`, position: "relative" }}
    >
      <TcView style={{ height: "100%", position: "absolute", width: "100%" }}>
        {children}
      </TcView>
    </TcView>
  );
};

AspectRatioContainer.propTypes = {
  aspectRatio: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default AspectRatioContainer;
