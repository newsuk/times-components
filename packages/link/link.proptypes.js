import PropTypes from "prop-types";
import { Text } from "react-native";

const propTypes = {
  style: Text.propTypes.style,
  url: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.element
  ]).isRequired
};

const defaultProps = {
  style: {}
};

export { defaultProps, propTypes };
