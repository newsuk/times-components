import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";
import Column from "../column";

const SecondaryOneAndFourSlice = ({
  renderSecondary,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4
}) => {
  const renderRowOne = renderSecondary();
  const renderFourRows = [
    renderSupport1,
    renderSupport2,
    renderSupport3,
    renderSupport4
  ];
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View key={renderRowOne.props.id}>{renderRowOne}</View>
      </View>
      <Column tiles={renderFourRows} />
    </View>
  );
};

SecondaryOneAndFourSlice.propTypes = propTypes;

export default SecondaryOneAndFourSlice;
