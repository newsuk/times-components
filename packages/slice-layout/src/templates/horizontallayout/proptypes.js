import PropTypes from "prop-types";

const propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      tile: PropTypes.node.isRequired
    })
  ).isRequired
};

export default propTypes;
