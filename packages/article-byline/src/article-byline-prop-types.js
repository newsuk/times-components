import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";

export const propTypes = {
  ast: PropTypes.arrayOf(treePropType).isRequired,
  isOpinionByline: PropTypes.bool,
  onAuthorPress: PropTypes.func
};

export const defaultProps = {
  isOpinionByline: false,
  onAuthorPress: () => null
};
