import PropTypes from "prop-types";
import {
  propTypes as sharedPropTypes,
  defaultProps as sharedDefaultProps
} from "./dom-context-prop-types-base";

const propTypes = {
  ...sharedPropTypes,
  height: PropTypes.number
};

const defaultProps = {
  ...sharedDefaultProps,
  height: 0
};

export { propTypes, defaultProps };
