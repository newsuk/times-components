import React from "react";
import { StyleSheet, View } from "react-native";
import SliceContent from "./slice-content";
import SliceHeading from "./slice-heading";
import { propTypes, defaultProps } from "./slice-prop-types";
import SharedStyles from "./styles/shared";

const styles = StyleSheet.create(SharedStyles);

const Slice = ({ item, template }) => (
  <View style={styles.container} template={template}>
    <SliceHeading />
    <SliceContent item={item} />
  </View>
);

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
