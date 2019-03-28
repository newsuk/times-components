import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import Column from "../column";
import styleFactory from "./styles";
import propTypes from "./proptypes";
import { ItemColSeparator } from "../shared";

const SecondaryOneAndColumnistSlice = ({ breakpoint, children }) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    return <Column>{children}</Column>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>{children[0]}</View>
      <ItemColSeparator style={styles.separator} />
      <View style={styles.columnistContainer}>{children[1]}</View>
    </View>
  );
};

SecondaryOneAndColumnistSlice.propTypes = propTypes;

export default SecondaryOneAndColumnistSlice;
