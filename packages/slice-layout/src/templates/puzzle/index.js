import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const Puzzle = ({ renderHeader, renderBody }) => {
  const header = renderHeader();
  const body = renderBody();
  const { mainContainer, headerContainer, bodyContainer } = styles;

  return (
    <View style={mainContainer}>
      <View style={headerContainer}>{header}</View>
      <View style={bodyContainer}>{body}</View>
    </View>
  );
};

Puzzle.propTypes = propTypes;

export default Puzzle;
