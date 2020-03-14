import { Text } from "react-native";
import PropTypes from "prop-types";

const { style: TextPropTypesStyle } = Text.propTypes;

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: PropTypes.shape({
    container: PropTypes.shape({}),
    text: TextPropTypesStyle
  }),
  text: PropTypes.string
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: ""
};
