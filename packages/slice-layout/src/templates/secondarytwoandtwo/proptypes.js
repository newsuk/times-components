import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { defaultProps, propTypes };
