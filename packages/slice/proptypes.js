// @TODO: delete this file when related articles wired up properly
import PropTypes from "prop-types";

export const propTypes = {
  template: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export const defaultProps = {
  template: "DEFAULT"
};
