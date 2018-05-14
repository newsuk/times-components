import PropTypes from "prop-types";

const nodeShape = {
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object
};

nodeShape.children = PropTypes.arrayOf(PropTypes.shape(nodeShape)).isRequired;

const Node = PropTypes.shape(nodeShape);

export default Node;
