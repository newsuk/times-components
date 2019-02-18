import React from "react";
import { View } from "react-native";
import styles from "../styles";
import config from "./config";
import propTypes from "./proptypes";

const StandardSlice = ({ itemCount, renderItems }) => {
  if (itemCount === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {renderItems(config({ itemCount })).map((item, index) => (
        <View
          key={item.props.id}
          style={
            index === itemCount - 1
              ? styles.itemContainerWithoutBorders
              : styles.itemContainer
          }
        >
          <View style={styles.item}>{item}</View>
        </View>
      ))}
    </View>
  );
};

StandardSlice.propTypes = propTypes;

export default StandardSlice;
