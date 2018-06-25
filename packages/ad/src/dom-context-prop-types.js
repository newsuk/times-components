import PropTypes from "prop-types";

export const propTypes = {
  data: PropTypes.shape({}),
  height: PropTypes.number,
  init: PropTypes.func.isRequired,
  onRenderComplete: PropTypes.func,
  width: PropTypes.number
};

export const defaultProps = {
  data: {},
  height: 0,
  onRenderComplete: () => {},
  width: 0
};
