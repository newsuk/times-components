import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ColumnLayout } from "../shared";

const SecondaryTwoNoPicAndTwoSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => (
  <ColumnLayout tiles={[renderSecondary1, renderSecondary2, renderSupport1, renderSupport2]} />
);

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
