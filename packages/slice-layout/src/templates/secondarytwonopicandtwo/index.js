import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ItemRowSeparator } from "../shared";

const SecondaryTwoNoPicAndTwoSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => (
  <View>
    {renderSecondary1()}
    <ItemRowSeparator />
    {renderSecondary2()}
    <ItemRowSeparator />
    {renderSupport1()}
    <ItemRowSeparator />
    {renderSupport2()}
  </View>
);

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
