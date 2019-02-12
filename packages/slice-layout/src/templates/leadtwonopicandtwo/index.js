import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ItemRowSeparator } from "../shared";

const LeadTwoNoPicAndTwoSlice = ({
  renderLead1,
  renderLead2,
  renderSupport1,
  renderSupport2
}) => (
  <View>
    {renderLead1()}
    <ItemRowSeparator />
    {renderLead2()}
    <ItemRowSeparator />
    {renderSupport1()}
    <ItemRowSeparator />
    {renderSupport2()}
  </View>
);

LeadTwoNoPicAndTwoSlice.propTypes = propTypes;

export default LeadTwoNoPicAndTwoSlice;
