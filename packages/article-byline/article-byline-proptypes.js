import PropTypes from "prop-types";
import { MarkupBuilder } from "@times-components/markup";
import { Text } from "react-native";

const articleBylinePropTypes = {
  ast: MarkupBuilder.propTypes.ast,
  style: PropTypes.shape({
    byline: Text.propTypes.style,
    link: Text.propTypes.style
  })
};

export default articleBylinePropTypes;
