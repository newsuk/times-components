import PropTypes from "prop-types";
import sharedPropTypes from "./key-facts-shared-prop-types";

export const propTypes = {
  children: sharedPropTypes.children,
  onLinkPress: PropTypes.func,
  title: PropTypes.string
};

export const defaultProps = {
  onLinkPress: () => {},
  title: ""
};
