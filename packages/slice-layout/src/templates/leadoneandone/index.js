import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";

const leadOneAndOneSlice = ({ renderLead, renderSupport1 }) => (
  <View>
    {renderLead()}
    {renderSupport1()}
  </View>
);

leadOneAndOneSlice.propTypes = propTypes;

export default leadOneAndOneSlice;
