import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import propTypes from "./proptypes";
import styleFactory from "./styles";
import { ItemColSeparator, ItemRowSeparator } from "../shared";
import VerticalLayout from "../verticallayout";
import HorizontalLayout from "../horizontallayout";

const SecondaryTwoNoPicAndTwoSlice = ({
  breakpoint,
  secondary1,
  secondary2,
  support1,
  support2
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return (
      <VerticalLayout tiles={[secondary1, secondary2, support1, support2]} />
    );
  }

  if (breakpoint === editionBreakpoints.medium) {
    return (
      <View style={styles.container}>
        <HorizontalLayout
          containerStyle={styles.itemContainer}
          tiles={[
            { style: styles.item, tile: secondary1 },
            { style: styles.item, tile: secondary2 }
          ]}
          colSeparatorStyle={styles.secondaryColSeparator}
        />
        <ItemRowSeparator />
        <HorizontalLayout
          containerStyle={styles.itemContainer}
          tiles={[
            { style: styles.item, tile: support1 },
            { style: styles.item, tile: support2 }
          ]}
          colSeparatorStyle={styles.supportColSeparator}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VerticalLayout
        style={styles.secondaryItemContainer}
        tiles={[secondary1]}
      />
      <ItemColSeparator />
      <VerticalLayout style={styles.supportItemContainer} tiles={[support1]} />
      <ItemColSeparator />
      <VerticalLayout
        style={styles.secondaryItemContainer}
        tiles={[secondary2]}
      />
      <ItemColSeparator />
      <VerticalLayout style={styles.supportItemContainer} tiles={[support2]} />
    </View>
  );
};

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
