import React from "react";
import PropTypes from "prop-types";
import Watermark from "@times-components/watermark";

const calculateViewBox = (width, height) => {
  if (width >= 970 && height >= 250) {
    return {
      marginLeft: 205,
      marginTop: -40,
      svgWidth: 584,
      svgHeight: 220
    };
  }

  if (width >= 728 && height >= 90) {
    return {
      marginLeft: 630,
      marginTop: -120,
      svgWidth: 1200,
      svgHeight: 50
    };
  }

  if (width >= 300 && height >= 250) {
    // MPU
    return {
      marginLeft: 15,
      marginTop: 0,
      svgWidth: 269,
      svgHeight: 250
    };
  }

  return {
    marginLeft: 50,
    marginTop: 0,
    svgWidth: width,
    svgHeight: height
  };
};

const AdWatermark = ({ width, height }) => {
  const box = calculateViewBox(width, height);
  const viewBox = `${-box.marginLeft} ${-box.marginTop} ${box.svgWidth} ${
    box.svgHeight
  }`;
  return <Watermark width={width} height={height} viewBox={viewBox} />;
};

AdWatermark.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default AdWatermark;
