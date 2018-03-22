import React from "react";
import PropTypes from "prop-types";
import Watermark from "@times-components/watermark";
import { spacing } from "@times-components/styleguide";

const calculateViewBox = (width, height) => {
  if (width >= 970 && height >= 250) {
    return {
      marginLeft: spacing(41),
      marginTop: spacing(-8),
      svgWidth: 584,
      svgHeight: 220
    };
  }

  if (width >= 728 && height >= 90) {
    return {
      marginLeft: spacing(126),
      marginTop: spacing(-24),
      svgWidth: 1200,
      svgHeight: 50
    };
  }

  if (width >= 300 && height >= 250) {
    // MPU
    return {
      marginLeft: spacing(3),
      marginTop: 0,
      svgWidth: 269,
      svgHeight: 250
    };
  }

  return {
    marginLeft: 10 * spacing,
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
