import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import propTypes from "./proptypes";
import styles from "./styles";
import { ItemColSeparator, ItemRowSeparator } from "../shared";
import Column from "../column";

const SecondaryTwoNoPicAndTwoSlice = ({ breakpoint, children }) => {
  if (breakpoint === editionBreakpoints.small) {
    return <Column>{children}</Column>;
  }

  return (
    <Fragment>
      <View style={styles.itemContainer}>
        <View key={children[0].props.id} style={styles.item}>
          {children[0]}
        </View>
        <ItemColSeparator />
        <View key={children[1].props.id} style={styles.item}>
          {children[1]}
        </View>
      </View>
      <ItemRowSeparator />
      <View style={styles.itemContainer}>
        <View key={children[2].props.id} style={styles.item}>
          {children[2]}
        </View>
        <ItemColSeparator />
        <View key={children[3].props.id} style={styles.item}>
          {children[3]}
        </View>
      </View>
    </Fragment>
  );
};

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
