import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";

export const propTypes = {
  name: PropTypes.string,
  description: PropTypes.arrayOf(treePropType),
  isLoading: PropTypes.bool
};

export const defaultProps = {
  name: "",
  description: [],
  isLoading: true
};
