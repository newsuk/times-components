import PropTypes from "prop-types";
import * as baseTypes from "./article-list-prop-types-base";

export const propTypes = {
  ...baseTypes.propTypes,
  onArticlePress: PropTypes.func.isRequired,
  onViewed: PropTypes.func
};

// eslint-disable-next-line prefer-destructuring
export const defaultProps = baseTypes.defaultProps;
