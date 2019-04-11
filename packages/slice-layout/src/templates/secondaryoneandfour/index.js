import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import propTypes from "./proptypes";
import VerticalLayout from "../verticallayout";
import { ItemColSeparator, ItemRowSeparator } from "../shared";

const SecondaryOneAndFourSlice = ({
  breakpoint,
  secondary,
  support1,
  support2,
  support3,
  support4
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    const renderFourRows = [support1, support2, support3, support4];
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View>{secondary}</View>
        </View>
        <VerticalLayout tiles={renderFourRows} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.secondaryItemContainer}>
        <View>{secondary}</View>
      </View>
      <ItemColSeparator style={styles.separator} />

      <View style={styles.itemContainer}>
        <View style={styles.item}>{support1}</View>
        <ItemRowSeparator style={styles.separator} />
        <View style={styles.item}>{support3}</View>
      </View>
      <ItemColSeparator style={styles.separator} />
      <View style={styles.itemContainer}>
        <View style={styles.item}>{support2}</View>
        <ItemRowSeparator style={styles.separator} />
        <View style={styles.item}>{support4}</View>
      </View>
    </View>
  );
};

SecondaryOneAndFourSlice.propTypes = propTypes;

export default SecondaryOneAndFourSlice;
