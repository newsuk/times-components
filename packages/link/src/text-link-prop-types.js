import PropTypes from "prop-types";
import { basePropTypes, baseDefaultProps } from "./text-link-prop-types-base";

export const propTypes = {
  ...basePropTypes,
  onPress: PropTypes.func,
  url: PropTypes.string.isRequired
};

export const defaultProps = {
  ...baseDefaultProps,
  onPress: () => {}
};
