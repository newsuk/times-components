import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

const Watermark = ({ height, viewBox, width }) => (
  <span className="watermark-svg-wrapper" style={{color: colours.functional.brandColour}}>
    <svg viewBox={viewBox}  width={width} height={height}>
      <use href="./d/img/watermark.svg#watermark"></use>
    </svg>
  </span>
);

Watermark.propTypes = {
  height: PropTypes.number.isRequired,
  viewBox: PropTypes.string,
  width: PropTypes.number.isRequired
};

Watermark.defaultProps = {
  viewBox: "0 0 300 250"
};

export default Watermark;
