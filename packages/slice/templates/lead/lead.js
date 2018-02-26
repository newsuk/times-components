import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "../styles";

const Slice = ({ lead, sections }) => (
  <View style={styles.container}>
    <View style={styles.childContainer}>
      <View style={[styles.child, { paddingTop: 0 }]}>{lead()}</View>
    </View>
    {sections.map(section => (
      <View key={section.key} style={styles.childContainer}>
        <View style={styles.child}>{section}</View>
      </View>
    ))}
  </View>
);

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
