import React from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import styles from "../styles";

const Slice = ({ children }) => (
  <View style={styles.container}>
    {children.map((child, index) => (
      <View key={child.key} style={styles.childContainer}>
        <View style={[styles.child, { paddingTop: index === 0 ? 0 : 10 }]}>
          {child}
        </View>
      </View>
    ))}
  </View>
);

Slice.propTypes = propTypes;

export default Slice;
