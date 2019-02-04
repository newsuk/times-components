import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const SecondaryTwoNoPicAndTwoSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => (
  <View style={styles.container}>
    {renderSecondary1()}
    <View style={styles.itemSeparator} />
    {renderSecondary2()}
    <View style={styles.itemSeparator} />
    {renderSupport1()}
    <View style={styles.itemSeparator} />
    {renderSupport2()}
  </View>
);

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
