import React from "react";
import { View } from "react-native";
import { ItemRowSeparator } from "../shared";
import propTypes from "./proptypes";

const leadOneAndFourSlice = ({
  renderLead,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4
}) => (
  <View>
    {renderLead()}
    {renderSupport1()}
    <ItemRowSeparator />
    {renderSupport2()}
    <ItemRowSeparator />
    {renderSupport3()}
    <ItemRowSeparator />
    {renderSupport4()}
  </View>
);

leadOneAndFourSlice.propTypes = propTypes;

export default leadOneAndFourSlice;
