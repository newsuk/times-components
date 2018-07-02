import PropTypes from "prop-types";

export const propTypes = {
  data: PropTypes.shape({}),
  height: PropTypes.number.isRequired,
  onRenderComplete: PropTypes.func,
  onRenderError: PropTypes.func,
  width: PropTypes.number.isRequired
};

export const defaultProps = {
  data: {},
  onRenderComplete: () => {},
  onRenderError: () => {}
};
