import PropTypes from "prop-types";
import { View } from "react-native";

const propTypes = {
  uri: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  style: View.propTypes.style
};

export default propTypes;
