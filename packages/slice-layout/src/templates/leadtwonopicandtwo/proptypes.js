import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  renderLead1: PropTypes.node.isRequired,
  renderLead2: PropTypes.node.isRequired,
  renderSupport1: PropTypes.node.isRequired,
  renderSupport2: PropTypes.node.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { propTypes, defaultProps };
