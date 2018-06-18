import PropTypes from "prop-types";

export const propTypes = {
  slotSuffix: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  init: PropTypes.func.isRequired,
  onRenderComplete: PropTypes.func,
  data: PropTypes.shape({})
};

export const defaultProps = {
  slotSuffix: "",
  data: {},
  onRenderComplete: () => {}
};
