import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  secondary1: PropTypes.node.isRequired,
  secondary2: PropTypes.node.isRequired,
  support1: PropTypes.node.isRequired,
  support2: PropTypes.node.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { defaultProps, propTypes };
