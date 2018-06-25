import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

export const propTypes = {
  height: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  width: PropTypes.number.isRequired
};

export const defaultProps = {
  style: null
};
