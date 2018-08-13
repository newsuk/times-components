import { Text } from "react-native";
import PropTypes from "prop-types";

const { style: StylePropType } = Text.propTypes;
export const basePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  style: StylePropType,
  target: PropTypes.string,
  url: PropTypes.string
};

export const baseDefaultProps = {
  style: {},
  target: null
};
