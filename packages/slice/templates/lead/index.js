import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "../styles";

const Slice = ({ lead, support1, support2 }) => (
  <View style={styles.container}>
    <View style={styles.childContainer}>
      <View style={[styles.child, { paddingTop: 0 }]}>{lead}</View>
    </View>
    {[support1, support2].filter(support => support !== null).map(support => (
      <View key={support.key} style={styles.childContainer}>
        <View style={styles.child}>{support}</View>
      </View>
    ))}
  </View>
);

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
