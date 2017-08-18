import PropTypes from "prop-types";
import { Text } from "react-native";

const propTypes = {
  style: Text.propTypes.style,
  url: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

const defaultProps = {
  style: {}
};

export { defaultProps, propTypes };
