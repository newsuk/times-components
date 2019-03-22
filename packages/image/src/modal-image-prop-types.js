import PropTypes from "prop-types";
import { defaultProps, propTypes } from "./image-prop-types";

export const modalPropTypes = {
  ...propTypes,
  caption: PropTypes.node,
  onImagePress: PropTypes.func,
  show: PropTypes.bool
};

export const modalDefaultProps = {
  ...defaultProps,
  caption: null,
  onImagePress: null,
  show: false
};
