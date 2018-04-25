import React from "react";
import { View, ViewPropTypes } from "react-native";

import styles from "./styles";

const Bar = ({ children, style, ...props }) => (
  <View {...props} style={[styles.bar, style]}>
    {children}
  </View>
);

Bar.propTypes = ViewPropTypes;

export default Bar;
