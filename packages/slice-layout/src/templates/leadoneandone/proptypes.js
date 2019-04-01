import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  renderLead: PropTypes.node.isRequired,
  renderSupport: PropTypes.node.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { propTypes, defaultProps };
