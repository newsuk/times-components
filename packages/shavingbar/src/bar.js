import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

import styles from "./styles";

const Bar = ({children, style, ...props}) => (
  <View {...props} style={[styles.bar, style]} >
    {children}
  </View>
);

export default Bar;
