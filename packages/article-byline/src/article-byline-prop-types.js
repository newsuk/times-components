import PropTypes from "prop-types";
import { Text } from "react-native";
import { propTypes as treePropType } from "@times-components/markup-forest";

export const propTypes = {
  ast: PropTypes.arrayOf(treePropType).isRequired,
  onAuthorPress: PropTypes.func,
  style: PropTypes.shape({
    text: Text.propTypes.style,
    link: Text.propTypes.style
  }),
  color: PropTypes.string
};

export const defaultProps = {
  onAuthorPress: () => null,
  style: {},
  color: ""
};
