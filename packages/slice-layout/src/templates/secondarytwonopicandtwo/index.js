import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const renderItemSeparator = () => <View style={styles.itemSeparator} />;

const SecondaryTwoNoPicAndTwoSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => (
  <View>
    {renderSecondary1()}
    {renderItemSeparator()}
    {renderSecondary2()}
    {renderItemSeparator()}
    {renderSupport1()}
    {renderItemSeparator()}
    {renderSupport2()}
  </View>
);

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
