import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import styles from "../styles";
import config from "./config";

const DefaultSlice = ({ itemCount, renderItems }) => (
  <View style={styles.container}>
    {renderItems(config(itemCount)).map((item, index) => (
      <View key={item.key} style={styles.itemContainer}>
        <View style={[styles.item, { paddingTop: index === 0 ? 0 : 10 }]}>
          {item}
        </View>
      </View>
    ))}
  </View>
);

DefaultSlice.propTypes = propTypes;

export default DefaultSlice;
