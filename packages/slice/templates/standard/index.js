import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import styles from "../styles";
import config from "./config";

const StandardSlice = ({ itemCount, renderItems }) => (
  <View style={styles.container}>
    {renderItems(config(itemCount)).map((item, index) => (
      <View key={item.props.id} style={styles.itemContainer}>
        <View style={[styles.item, { paddingTop: index === 0 ? 0 : 10 }]}>
          {item}
        </View>
      </View>
    ))}
  </View>
);

StandardSlice.propTypes = propTypes;

export default StandardSlice;
