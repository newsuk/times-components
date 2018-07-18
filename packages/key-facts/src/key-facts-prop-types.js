import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";
// import sharedPropTypes from "./key-facts-shared-prop-types";

export const propTypes = {
  ast: PropTypes.arrayOf(treePropType).isRequired,
  onLinkPress: PropTypes.func.isRequired,
  title: PropTypes.string
};

export const defaultProps = {
  title: ""
};
