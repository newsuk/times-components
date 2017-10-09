import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

export const boxStyles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    height: 200,
    width: 200
  }
});

const Box = props => (
  <View id={props.id} style={[boxStyles.box, { backgroundColor: props.color }]}>
    {props.children}
  </View>
);
Box.propTypes = {
  id: PropTypes.string,
  children: PropTypes.element,
  color: PropTypes.string
};
Box.defaultProps = {
  children: null,
  id: "",
  color: ""
};

export default Box;
