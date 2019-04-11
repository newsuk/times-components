import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  secondary1: PropTypes.node.isRequired,
  secondary2: PropTypes.node.isRequired,
  secondary3: PropTypes.node.isRequired,
  secondary4: PropTypes.node.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { propTypes, defaultProps };
