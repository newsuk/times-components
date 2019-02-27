import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";

const propTypes = {
  breakpoint: PropTypes.string,
  renderLead: PropTypes.func.isRequired,
  renderSupport1: PropTypes.func.isRequired,
  renderSupport2: PropTypes.func.isRequired,
  renderSupport3: PropTypes.func.isRequired,
  renderSupport4: PropTypes.func.isRequired
};

const defaultProps = {
  breakpoint: editionBreakpoints.small
};

export { propTypes, defaultProps };
