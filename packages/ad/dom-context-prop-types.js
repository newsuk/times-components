import PropTypes from "prop-types";

const script = PropTypes.shape({
  uri: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  canRequestFail: PropTypes.bool
});

export const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  scripts: PropTypes.arrayOf(script),
  init: PropTypes.func.isRequired,
  onRenderComplete: PropTypes.func,
  data: PropTypes.shape({})
};

export const defaultProps = {
  scripts: [],
  data: {},
  onRenderComplete: () => {}
};
