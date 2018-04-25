import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

import styles from "./styles";

const Group = ({caption, role, style, children, orientation, ...props}) => (
  <View style={[styles.group, style]} {...props} >
    <Text style={styles.text} aria-label={role}>{caption}</Text>
    <View style={styles.groupElements}>
      {children}
    </View>
  </View>
);

export default withResponsiveStyles(Group, {
  base: ({orientation}) => console.log(orientation) || `
    flex-direction: column-reverse;
    align-items: ${orientation};
  `,
  smallUp: ({orientation}) => console.log(orientation) || `
    flex-direction: row;
    align-items: center;
    justify-content: ${orientation};
  `
});
