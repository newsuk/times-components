import PropTypes from "prop-types";
import { Text } from "react-native";
import { propTypes as treePropType } from "@times-components/markup-forest";

export const propTypes = {
  ast: PropTypes.arrayOf(treePropType).isRequired,
  color: PropTypes.string,
  onAuthorPress: PropTypes.func,
  style: PropTypes.shape({
    link: Text.propTypes.style,
    text: Text.propTypes.style
  })
};

export const defaultProps = {
  color: "",
  onAuthorPress: () => null,
  style: {}
};
