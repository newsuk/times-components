import PropTypes from "prop-types";
import {
  propTypes as basePropTypes,
  defaultProps as baseDefaultProps
} from "./topic-prop-types.base";

export const propTypes = {
  ...basePropTypes,
  onArticlePress: PropTypes.func.isRequired
};

export const defaultProps = {
  ...baseDefaultProps
};
