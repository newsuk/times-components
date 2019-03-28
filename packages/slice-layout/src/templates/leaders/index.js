import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import Column from "../column";
import { ItemColSeparator } from "../shared";
import propTypes from "./proptypes";

const Leaders = ({ breakpoint, children }) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return <Column style={styles.container}>{children}</Column>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.columnItems}>{children[1]}</View>
      <ItemColSeparator />
      <View style={styles.columnItems}>{children[0]}</View>
      <ItemColSeparator />
      <View style={styles.columnItems}>{children[2]}</View>
    </View>
  );
};

Leaders.propTypes = propTypes;

export default Leaders;
