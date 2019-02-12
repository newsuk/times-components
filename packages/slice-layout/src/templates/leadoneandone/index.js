import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";

const leadOneAndOneSlice = ({ renderLead, renderSupport }) => (
  <View>
    {renderLead()}
    {renderSupport()}
  </View>
);

leadOneAndOneSlice.propTypes = propTypes;

export default leadOneAndOneSlice;
