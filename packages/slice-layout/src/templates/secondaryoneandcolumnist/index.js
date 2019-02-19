import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ItemRowSeparator } from "../shared";

const SecondaryOneAndColumnistSlice = ({
  renderSecondary,
  renderColumnist
}) => (
  <View>
    {renderSecondary()}
    <ItemRowSeparator />
    {renderColumnist()}
  </View>
);

SecondaryOneAndColumnistSlice.propTypes = propTypes;

export default SecondaryOneAndColumnistSlice;
