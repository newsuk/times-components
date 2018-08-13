import PropTypes from "prop-types";

// all fields are optional and don't have default props because:
// 1) if width and height is not set Svg scales to fill the parent container
// 2) the svgs package creates different markup when title or strokecolour is set
export default {
  fillColour: PropTypes.string,
  height: PropTypes.number,
  strokeColour: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number
};
