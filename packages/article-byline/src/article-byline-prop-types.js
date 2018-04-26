import PropTypes from "prop-types";
import { Text } from "react-native";
import { treePropType } from "@times-components/markup";
import { colours } from "@times-components/styleguide";

export const articleBylinePropTypes = {
  ast: PropTypes.arrayOf(treePropType).isRequired,
  color: PropTypes.string,
  onAuthorPress: PropTypes.func,
  style: PropTypes.shape({
    link: Text.propTypes.style
  })
};

export const articleBylineDefaultPropTypes = {
  ast: {},
  color: colours.functional.secondary,
  onAuthorPress: () => null,
  style: {}
};
