import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const renderItemSeparator = () => <View style={styles.itemSeparator} />;

const LeadTwoNoPicAndTwoSlice = ({
  renderLead1,
  renderLead2,
  renderSupport1,
  renderSupport2
}) => (
  <View>
    {renderLead1()}
    {renderItemSeparator()}
    {renderLead2()}
    {renderItemSeparator()}
    {renderSupport1()}
    {renderItemSeparator()}
    {renderSupport2()}
  </View>
);

LeadTwoNoPicAndTwoSlice.propTypes = propTypes;

export default LeadTwoNoPicAndTwoSlice;
