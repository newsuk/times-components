import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const TestButton = props =>
  <TouchableOpacity
    style={{
      backgroundColor: "blue",
      padding: 5,
      margin: 5
    }}
    onClick={props.onClick}
  >
    <Text style={{ color: "white" }}>{props.buttonText}</Text>
  </TouchableOpacity>;

TestButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

TestButton.defaultProps = {
  onClick: () => {},
  text: "click here"
};

export default TestButton;
