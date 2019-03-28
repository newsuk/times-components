import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator, ItemRowSeparator } from "../shared";

const SecondaryTwoAndTwoSlice = ({ breakpoint, children }) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    return (
      <Fragment>
        <View style={styles.itemContainer}>
          <View key={children[0].props.id} style={styles.itemHalfWidth}>
            {children[0]}
          </View>
          <ItemColSeparator />
          <View key={children[1].props.id} style={styles.itemHalfWidth}>
            {children[1]}
          </View>
        </View>
        <ItemRowSeparator />
        <View key={children[2].props.id}>{children[2]}</View>
        <ItemRowSeparator />
        <View key={children[3].props.id}>{children[3]}</View>
      </Fragment>
    );
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

SecondaryTwoAndTwoSlice.propTypes = propTypes;
SecondaryTwoAndTwoSlice.defaultProps = defaultProps;

export default SecondaryTwoAndTwoSlice;
