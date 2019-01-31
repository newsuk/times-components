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
  const renderRowOne = [renderSecondary1(), renderSecondary2()];
  const renderRowTwo = [renderSecondary3(), renderSecondary4()];
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View key={renderRowOne[0].props.id} style={styles.item}>
          {renderRowOne[0]}
        </View>
        <View style={styles.itemSeparator} />
        <View key={renderRowOne[1].props.id} style={styles.item}>
          {renderRowOne[1]}
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View key={renderRowTwo[0].props.id} style={styles.item}>
          {renderRowTwo[0]}
        </View>
        <View style={styles.itemSeparator} />
        <View key={renderRowTwo[1].props.id} style={styles.item}>
          {renderRowTwo[1]}
        </View>
      </View>
    </View>
  );
};

SecondaryFourSlice.propTypes = propTypes;

export default SecondaryFourSlice;
