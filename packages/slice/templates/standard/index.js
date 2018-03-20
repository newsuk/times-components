import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import styles from "../styles";
import config from "./config";

const StandardSlice = ({ itemCount, renderItems }) => {
  const itemPaddingStyle = itemCount >= 3 ? { paddingTop: 15 } : {};
  return (
    <View style={styles.container}>
      {renderItems(config(itemCount)).map(item => (
        <View key={item.props.id} style={styles.itemContainer}>
          <View style={[styles.item, itemPaddingStyle]}>{item}</View>
        </View>
      ))}
    </View>
  );
};

StandardSlice.propTypes = propTypes;

export default StandardSlice;
