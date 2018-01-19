import PropTypes from "prop-types";

export const propTypes = {
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  scriptUris: PropTypes.arrayOf(PropTypes.string),
  globalNames: PropTypes.arrayOf(PropTypes.string),
  init: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any
};

export const defaultProps = {
  id: "dom-context-id",
  width: 200,
  height: 200,
  scriptUris: [],
  globalNames: [],
  data: {}
};
