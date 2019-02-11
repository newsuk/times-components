import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const SecondaryTwoAndTwoSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => {
  const renderRowOne = [renderSecondary1(), renderSecondary2()];
  const renderRowTwo = [renderSupport1(), renderSupport2()];
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View key={renderRowOne[0].props.id} style={styles.itemHalfWidth}>
          {renderRowOne[0]}
        </View>
        <View style={styles.itemColumnSeparator} />
        <View key={renderRowOne[1].props.id} style={styles.itemHalfWidth}>
          {renderRowOne[1]}
        </View>
      </View>
      <View style={styles.itemRowSeparator} />
      <View key={renderRowTwo[0].props.id}>{renderRowTwo[0]}</View>
      <View style={styles.itemRowSeparator} />
      <View key={renderRowTwo[1].props.id}>{renderRowTwo[1]}</View>
    </View>
  );
};

SecondaryTwoAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoAndTwoSlice;
