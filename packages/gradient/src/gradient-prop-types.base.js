import PropTypes from "prop-types";
import {
  propTypes as sharedPropTypes,
  defaultProps as sharedDefaultPropTypes
} from "./gradient-prop-types";

export const propTypes = {
  ...sharedPropTypes,
  endColour: PropTypes.string.isRequired,
  startColour: PropTypes.string.isRequired
};

export const defaultProps = {
  ...sharedDefaultPropTypes
};
