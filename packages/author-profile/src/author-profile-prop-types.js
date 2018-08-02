import PropTypes from "prop-types";
import {
  propTypes as basePropTypes,
  defaultProps as baseDefaultProps
} from "./author-profile-prop-types.base";

export const propTypes = {
  ...basePropTypes,
  onArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired
};

export const defaultProps = {
  ...baseDefaultProps
};
