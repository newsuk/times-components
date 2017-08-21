import PropTypes from "prop-types";
import { Text } from "react-native";

const astType = {
  name: PropTypes.string,
  attributes: PropTypes.object
};

astType.children = PropTypes.arrayOf(PropTypes.shape(astType));

export const articleBylinePropTypes = {
  ast: PropTypes.arrayOf(PropTypes.shape(astType)).isRequired,
  style: PropTypes.shape({
    byline: Text.propTypes.style,
    link: Text.propTypes.style
  })
};

export const articleBylineDefaultPropTypes = {
  ast: {},
  style: {}
};
