import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import styles from "../styles";

const DefaultSlice = ({ itemCount, renderItems }) => {
  const config = {
    showImage: itemCount < 3
  };

  return (
    <View style={styles.container}>
      {renderItems(config).map((item, index) => (
        <View key={item.key} style={styles.itemContainer}>
          <View style={[styles.item, { paddingTop: index === 0 ? 0 : 10 }]}>
            {item}
          </View>
        </View>
      ))}
    </View>
  );
};

DefaultSlice.propTypes = propTypes;

export default DefaultSlice;
