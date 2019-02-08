import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const renderItemSeparator = () => <View style={styles.itemSeparator} />;

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
    {renderItemSeparator()}
    {renderSupport2()}
    {renderItemSeparator()}
    {renderSupport3()}
    {renderItemSeparator()}
    {renderSupport4()}
  </View>
);

leadOneAndFourSlice.propTypes = propTypes;

export default leadOneAndFourSlice;
