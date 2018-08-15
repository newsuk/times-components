import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

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
