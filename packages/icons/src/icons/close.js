import React from "react";
import Svg, { Path } from "@times-components/svgs";
import { clean } from "@times-components/utils";
import PropTypes from "prop-types";

const IconClose = ({ height, width }) => (
  <Svg
    role="img"
    viewBox="0 0 28 28"
    {...clean({
      height,
      width,
      title: "Close Icon"
    })}
  >
    <Path
      {...clean({
        fill: "white",
        stroke: "white"
      })}
      d="M15.617 14l4.683 5.838-.462.462L14 15.617 8.162 20.3l-.462-.462L12.383 14 7.7 8.162l.462-.462L14 12.383 19.838 7.7l.462.462z"
    />
  </Svg>
);

IconClose.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

IconClose.defaultProps = {
  height: 28,
  width: 28
};

export default IconClose;
