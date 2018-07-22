import PropTypes from "prop-types";
import * as baseTypes from "./article-list-item-prop-types.base";

export const propTypes = {
  ...baseTypes.propTypes,
  onPress: PropTypes.func.isRequired
};

// eslint-disable-next-line prefer-destructuring
export const defaultProps = baseTypes.defaultProps;
