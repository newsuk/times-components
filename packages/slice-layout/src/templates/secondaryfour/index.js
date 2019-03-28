import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./proptypes";
import { ItemColSeparator, ItemRowSeparator } from "../shared";

const SecondaryFourSlice = ({ breakpoint, children }) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
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
  }

  return (
    <View style={styles.container}>
      <View key={children[0].props.id} style={styles.item}>
        {children[0]}
      </View>
      <ItemColSeparator />
      <View key={children[1].props.id} style={styles.item}>
        {children[1]}
      </View>
      <ItemColSeparator />
      <View key={children[2].props.id} style={styles.item}>
        {children[2]}
      </View>
      <ItemColSeparator />
      <View key={children[3].props.id} style={styles.item}>
        {children[3]}
      </View>
    </View>
  );
};

SecondaryFourSlice.propTypes = propTypes;
SecondaryFourSlice.defaultProps = defaultProps;

export default SecondaryFourSlice;
