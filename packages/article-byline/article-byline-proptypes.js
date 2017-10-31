import PropTypes from "prop-types";
import { Text, ViewPropTypes } from "react-native";
import { treePropType } from "@times-components/markup";

export const articleBylinePropTypes = {
  ast: PropTypes.arrayOf(treePropType).isRequired,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    byline: Text.propTypes.style,
    link: Text.propTypes.style
  })
};

export const articleBylineDefaultPropTypes = {
  ast: {},
  style: {}
};
