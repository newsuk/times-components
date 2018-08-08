import PropTypes from "prop-types";
import { defaultProps, propTypes } from "./image-prop-types";

export const modalPropTypes = {
  ...propTypes,
  caption: PropTypes.string,
  credits: PropTypes.string,
  show: PropTypes.boolean
};

export const modalDefaultProps = {
  ...defaultProps,
  caption: "",
  credits: "",
  show: false
};
