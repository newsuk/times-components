import PropTypes from "prop-types";
import sharedPropTypes from "./related-articles-prop-types-base";

export default {
  ...sharedPropTypes,
  onPress: PropTypes.func.isRequired
};
