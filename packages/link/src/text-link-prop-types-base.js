import PropTypes from "prop-types";

export const basePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  target: PropTypes.string,
  url: PropTypes.string
};

export const baseDefaultProps = {
  style: {},
  target: null
};
