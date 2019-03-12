import PropTypes from "prop-types";
import {
  propTypes as sharedPropTypes,
  defaultProps as sharedDefaultProps
} from "./gradient-prop-types-shared";

export const propTypes = {
  ...sharedPropTypes,
  height: PropTypes.number,
  width: PropTypes.number
};

export const defaultProps = {
  ...sharedDefaultProps,
  height: 0,
  width: 0
};
