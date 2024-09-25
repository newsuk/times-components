import * as React from "react";
import PropTypes from "prop-types";

const PuzzleIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none">
    <path
      fill={color}
      d="M12.667 6.833h-1V4.167c0-.734-.6-1.334-1.334-1.334H7.667v-1a1.667 1.667 0 0 0-3.334 0v1H1.667c-.734 0-1.327.6-1.327 1.334V6.7h.993a1.801 1.801 0 0 1 0 3.6h-1v2.533c0 .734.6 1.334 1.334 1.334H4.2v-1a1.801 1.801 0 0 1 3.6 0v1h2.533c.734 0 1.334-.6 1.334-1.334v-2.666h1a1.667 1.667 0 0 0 0-3.334Z"
    />
  </svg>
);

PuzzleIcon.defaultProps = {
  color: ""
};

PuzzleIcon.propTypes = {
  color: PropTypes.string
};

export default PuzzleIcon;
