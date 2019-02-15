import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";
import { ItemRowSeparator } from "../shared";

const SecondaryOneAndFourSlice = ({
  renderSecondary1,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4
}) => {
  const renderRowOne = renderSecondary1();
  const renderFourRows = [
    renderSupport1(),
    renderSupport2(),
    renderSupport3(),
    renderSupport4()
  ];
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View key={renderRowOne.props.id}>{renderRowOne}</View>
      </View>
      <ItemRowSeparator style={styles.separator} />
      <View key={renderFourRows[0].props.id}>{renderFourRows[0]}</View>
      <ItemRowSeparator style={styles.separator} />
      <View key={renderFourRows[1].props.id}>{renderFourRows[1]}</View>
      <ItemRowSeparator style={styles.separator} />
      <View key={renderFourRows[2].props.id}>{renderFourRows[2]}</View>
      <ItemRowSeparator style={styles.separator} />
      <View key={renderFourRows[3].props.id}>{renderFourRows[3]}</View>
    </View>
  );
};

SecondaryOneAndFourSlice.propTypes = propTypes;

export default SecondaryOneAndFourSlice;
