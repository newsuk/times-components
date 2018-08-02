import PropTypes from "prop-types";
import { basePropTypes, baseDefaultProps } from "./text-link-prop-types-base";

export const propTypes = {
  ...basePropTypes,
  url: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export const defaultProps = {
  ...baseDefaultProps,
  url: null
};
