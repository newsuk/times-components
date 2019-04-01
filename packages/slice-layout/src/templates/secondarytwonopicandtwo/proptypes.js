import PropTypes from "prop-types";

const propTypes = {
  breakpoint: PropTypes.string,
  renderSecondary1: PropTypes.node.isRequired,
  renderSecondary2: PropTypes.node.isRequired,
  renderSupport1: PropTypes.node.isRequired,
  renderSupport2: PropTypes.node.isRequired
};

export default propTypes;
