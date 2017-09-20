import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const Button = props => (
  <TouchableOpacity
    testID={props.testID}
    style={{
      backgroundColor: "blue",
      padding: 5,
      margin: 5,
      width: 200
    }}
    onPress={props.onPress}
  >
    <Text style={{ color: "white", textAlign: "center" }}>
      {props.buttonText}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  testID: PropTypes.string
};

Button.defaultProps = {
  onPress: () => {},
  text: "click here",
  testID: "button"
};

export default Button;
