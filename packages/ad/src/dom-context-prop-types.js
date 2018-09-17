import PropTypes from "prop-types";

export const propTypes = {
  data: PropTypes.shape({}),
  height: PropTypes.number,
  init: PropTypes.func.isRequired,
  onRenderComplete: PropTypes.func,
  onRenderError: PropTypes.func,
  width: PropTypes.number.isRequired
};

export const defaultProps = {
  data: {},
  height: 0,
  onRenderComplete: () => {},
  onRenderError: () => {}
};
