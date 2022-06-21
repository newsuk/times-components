import PropTypes from "prop-types";

export const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  degrees: PropTypes.number,
  endColour: PropTypes.string,
  endPoint: PropTypes.string,
  startColour: PropTypes.string,
  startPoint: PropTypes.string,
  style: PropTypes.object
};

export const defaultProps = {
  children: null,
  degrees: 265,
  endPoint: "1",
  startPoint: "0",
  style: null
};
