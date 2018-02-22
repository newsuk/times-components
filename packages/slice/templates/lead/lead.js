import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "../styles";

const Slice = ({ lead, child1, child2 }) => {
  const hasChildren = child1();
  const hasTwoChildren = child2();
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <View style={[styles.child, { paddingTop: 0 }]}>{lead()}</View>
      </View>
      {hasChildren ? (
        <View style={styles.childContainer}>
          <View style={styles.child}>{child1()}</View>
        </View>
      ) : null}
      {hasTwoChildren ? (
        <View style={styles.childContainer}>
          <View style={styles.child}>{child2()}</View>
        </View>
      ) : null}
    </View>
  );
};

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
