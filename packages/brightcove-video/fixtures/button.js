import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const Button = props =>
  <TouchableOpacity
    style={{
      backgroundColor: "blue",
      padding: 5,
      margin: 5
    }}
    onPress={props.onPress}
  >
    <Text style={{ color: "white" }}>{props.buttonText}</Text>
  </TouchableOpacity>;

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

Button.defaultProps = {
  onPress: () => {},
  text: "click here"
};

export default Button;
