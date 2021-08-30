import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";

export const propTypes = {
  metaDescription: PropTypes.string,
  description: PropTypes.arrayOf(treePropType),
  isLoading: PropTypes.bool,
  name: PropTypes.string
};

export const defaultProps = {
  metaDescription: "",
  description: [],
  isLoading: true,
  name: ""
};
