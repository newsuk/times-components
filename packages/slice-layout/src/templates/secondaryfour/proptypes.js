import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  renderSecondary1: PropTypes.node.isRequired,
  renderSecondary2: PropTypes.node.isRequired,
  renderSecondary3: PropTypes.node.isRequired,
  renderSecondary4: PropTypes.node.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { propTypes, defaultProps };
