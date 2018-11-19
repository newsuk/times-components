import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const Button = ({ buttonText, onPress, testID }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "blue",
      margin: 5,
      padding: 5,
      width: 200
    }}
    testID={testID}
  >
    <Text style={{ color: "white", textAlign: "center" }}>{buttonText}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
  testID: PropTypes.string
};

Button.defaultProps = {
  buttonText: "click here",
  onPress: () => {},
  testID: "button"
};

export default Button;
