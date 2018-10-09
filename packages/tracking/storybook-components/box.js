import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

export const boxStyles = StyleSheet.create({
  box: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
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
  children: PropTypes.element,
  color: PropTypes.string,
  id: PropTypes.string
};
Box.defaultProps = {
  children: null,
  color: "",
  id: ""
};

export default Box;
