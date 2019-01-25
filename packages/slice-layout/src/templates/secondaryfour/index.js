import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const SecondaryFourSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSecondary3,
  renderSecondary4
}) => {
  const renderSecondaryRowOne = [renderSecondary1(), renderSecondary2()];
  const renderSecondaryRowTwo = [renderSecondary3(), renderSecondary4()];
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View key={renderSecondaryRowOne[0].props.id} style={styles.item}>
          {renderSecondaryRowOne[0]}
        </View>
        <View style={styles.itemSeparator} />
        <View key={renderSecondaryRowOne[1].props.id} style={styles.item}>
          {renderSecondaryRowOne[1]}
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View key={renderSecondaryRowTwo[0].props.id} style={styles.item}>
          {renderSecondaryRowTwo[0]}
        </View>
        <View style={styles.itemSeparator} />
        <View key={renderSecondaryRowTwo[1].props.id} style={styles.item}>
          {renderSecondaryRowTwo[1]}
        </View>
      </View>
    </View>
  );
};

SecondaryFourSlice.propTypes = propTypes;

export default SecondaryFourSlice;
