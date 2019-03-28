import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import propTypes from "./proptypes";
import Column from "../column";
import { ItemColSeparator, ItemRowSeparator } from "../shared";

const SecondaryOneAndFourSlice = ({
  breakpoint,
  children: [secondary, ...supports]
}) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View key={secondary.props.id}>{secondary}</View>
        </View>
        <Column>{supports}</Column>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.secondaryItemContainer}>
        <View key={secondary.props.id}>{secondary}</View>
      </View>
      <ItemColSeparator style={styles.separator} />
      <View style={styles.itemContainer}>
        <View key={supports[0].props.id} style={styles.item}>
          {supports[0]}
        </View>
        <ItemRowSeparator style={styles.separator} />
        <View key={supports[1].props.id} style={styles.item}>
          {supports[1]}
        </View>
      </View>
      <ItemColSeparator style={styles.separator} />
      <View style={styles.itemContainer}>
        <View key={supports[2].props.id} style={styles.item}>
          {supports[2]}
        </View>
        <ItemRowSeparator style={styles.separator} />
        <View key={supports[3].props.id} style={styles.item}>
          {supports[3]}
        </View>
      </View>
    </View>
  );
};

SecondaryOneAndFourSlice.propTypes = propTypes;

export default SecondaryOneAndFourSlice;
