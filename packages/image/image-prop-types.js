import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const propTypes = {
  uri: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  style: ViewPropTypes.style
};

export default propTypes;
