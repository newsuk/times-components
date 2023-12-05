import PropTypes from "prop-types";

const TextNode = PropTypes.shape({ text: PropTypes.string });

const childNode = {
  attributes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

const nodeShape = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape(childNode), TextNode])
  ).isRequired
};

export const propTypes = {
  bylines: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  onAuthorPress: PropTypes.func,
  publicationName: PropTypes.string,
  publishedTime: PropTypes.string
};

export const defaultProps = {
  bylines: [],
  publicationName: null,
  publishedTime: null
};
