import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { defaultProps, propTypes } from "./proptypes";
import { ItemRowSeparator } from "../shared";
import HorizontalLayout from "../horizontallayout";

const SecondaryTwoAndTwoSlice = ({
  breakpoint,
  secondary1,
  secondary2,
  support1,
  support2
}) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    return (
      <Fragment>
        <HorizontalLayout
          containerStyle={styles.itemContainer}
          tiles={[
            { style: styles.itemHalfWidth, tile: secondary1 },
            { style: styles.itemHalfWidth, tile: secondary2 }
          ]}
        />
        <ItemRowSeparator />
        <View>{support1}</View>
        <ItemRowSeparator />
        <View>{support2}</View>
      </Fragment>
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
        />
        <ItemRowSeparator />
        <HorizontalLayout
          containerStyle={styles.itemContainer}
          tiles={[
            { style: styles.item, tile: support1 },
            { style: styles.item, tile: support2 }
          ]}
        />
      </View>
    );
  }

  return (
    <HorizontalLayout
      containerStyle={styles.container}
      tiles={[
        { style: styles.secondaryItemContainer, tile: secondary1 },
        { style: styles.supportItemContainer, tile: support1 },
        { style: styles.secondaryItemContainer, tile: secondary2 },
        { style: styles.supportItemContainer, tile: support2 }
      ]}
    />
  );
};

SecondaryTwoAndTwoSlice.propTypes = propTypes;
SecondaryTwoAndTwoSlice.defaultProps = defaultProps;

export default SecondaryTwoAndTwoSlice;
