import React from "react";
import { View } from "react-native";
import Column from "../column";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import propTypes from "./proptypes";
import { ItemRowSeparator, ItemColSeparator } from "../shared";

const SecondaryOneAndColumnistSlice = ({
  breakpoint,
  renderSecondary,
  renderColumnist
}) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    return <Column tiles={[renderSecondary, renderColumnist]} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>{renderSecondary()}</View>
      <ItemColSeparator />
      <View style={styles.columnistContainer}>{renderColumnist()}</View>
    </View>
  );
};

SecondaryOneAndColumnistSlice.propTypes = propTypes;

export default SecondaryOneAndColumnistSlice;
