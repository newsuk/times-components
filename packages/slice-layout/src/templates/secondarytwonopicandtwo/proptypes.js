import PropTypes from "prop-types";

const propTypes = {
  breakpoint: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default propTypes;
