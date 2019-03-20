import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import Column from "../column";
import styleFactory from "./styles";
import propTypes from "./proptypes";
import { ItemColSeparator } from "../shared";

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
      <ItemColSeparator style={styles.separator} />
      <View style={styles.columnistContainer}>{renderColumnist()}</View>
    </View>
  );
};

SecondaryOneAndColumnistSlice.propTypes = propTypes;

export default SecondaryOneAndColumnistSlice;
