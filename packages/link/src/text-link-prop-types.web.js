import PropTypes from "prop-types";
import { basePropTypes, baseDefaultProps } from "./text-link-prop-types-base";

export const propTypes = {
  ...basePropTypes,
  url: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export const defaultProps = {
  ...baseDefaultProps,
  onPress: () => {}
};
