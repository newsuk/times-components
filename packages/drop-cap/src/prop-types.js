import PropTypes from "prop-types";

export const propTypes = {
  colour: PropTypes.string,
  dropCap: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export const defaultProps = {
  colour: "black"
};
