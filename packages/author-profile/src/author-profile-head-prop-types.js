import PropTypes from "prop-types";
import {
  propTypes as basePropTypes,
  defaultProps as baseDefaultPropTypes
} from "./author-profile-head-prop-types.base";

export const propTypes = {
  ...basePropTypes,
  onTwitterLinkPress: PropTypes.func.isRequired
};

export const defaultProps = {
  ...baseDefaultPropTypes
};
