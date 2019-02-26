import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  renderLead1: PropTypes.func.isRequired,
  renderLead2: PropTypes.func.isRequired,
  renderSupport1: PropTypes.func.isRequired,
  renderSupport2: PropTypes.func.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { propTypes, defaultProps };
