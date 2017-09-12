import PropTypes from "prop-types";

const astType = {
  name: PropTypes.string,
  attributes: PropTypes.object
};

astType.children = PropTypes.arrayOf(PropTypes.shape(astType));

export const articleImagePropTypes = {
  ast: PropTypes.arrayOf(PropTypes.shape(astType)).isRequired
};

export const articleImageDefaultPropTypes = {
  ast: {}
};
