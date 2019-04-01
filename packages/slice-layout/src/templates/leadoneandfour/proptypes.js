import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  renderLead: PropTypes.node.isRequired,
  renderSupport1: PropTypes.node.isRequired,
  renderSupport2: PropTypes.node.isRequired,
  renderSupport3: PropTypes.node.isRequired,
  renderSupport4: PropTypes.node.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { propTypes, defaultProps };
