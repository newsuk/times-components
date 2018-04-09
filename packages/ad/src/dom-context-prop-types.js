import PropTypes from "prop-types";

export const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  init: PropTypes.func.isRequired,
  onRenderComplete: PropTypes.func,
  data: PropTypes.shape({})
};

export const defaultProps = {
  data: {},
  onRenderComplete: () => {}
};
