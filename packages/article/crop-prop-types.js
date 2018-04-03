import PropTypes from "prop-types";

const cropPropTypes = PropTypes.shape({
  ratio: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
});

export default cropPropTypes;
