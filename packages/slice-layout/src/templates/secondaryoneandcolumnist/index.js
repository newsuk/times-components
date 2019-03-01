import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ColumnLayout } from "../shared";

const SecondaryOneAndColumnistSlice = ({
  renderSecondary,
  renderColumnist
}) => (
  <ColumnLayout tiles={[renderSecondary, renderColumnist]} />
);

SecondaryOneAndColumnistSlice.propTypes = propTypes;

export default SecondaryOneAndColumnistSlice;
