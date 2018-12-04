import PropTypes from "prop-types";
import { defaultProps, propTypes } from "./image-prop-types";

export const modalPropTypes = {
  ...propTypes,
  caption: PropTypes.node,
  show: PropTypes.bool
};

export const modalDefaultProps = {
  ...defaultProps,
  caption: null,
  show: false
};
