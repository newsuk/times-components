import PropTypes from "prop-types";

export const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  scriptUris: PropTypes.arrayOf(PropTypes.string),
  globalNames: PropTypes.arrayOf(PropTypes.string),
  init: PropTypes.func.isRequired,
  onRenderComplete: PropTypes.func,
  data: PropTypes.shape({})
};

export const defaultProps = {
  scriptUris: [],
  globalNames: [],
  data: {},
  onRenderComplete: () => {}
};
