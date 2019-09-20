import PropTypes from "prop-types";
import {
  propTypes as basePropTypes,
  defaultProps as baseDefaultProps
} from "./article-list-prop-types-base";

export const propTypes = {
  ...basePropTypes,
  onArticlePress: PropTypes.func.isRequired,
  onViewed: PropTypes.func,
  scrollToTop: PropTypes.bool
};

export const defaultProps = {
  ...baseDefaultProps,
  scrollToTop: true
};
