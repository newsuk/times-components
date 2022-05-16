import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import PropTypes from "prop-types";
import styleFactory from "./styles";
import { ItemRowSeparator, ItemColSeparator } from "../shared";
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
    <View style={styles.rowContainer}>
      <HorizontalLayout
        containerStyle={styles.secondaryContainer}
        tiles={[
          { style: styles.item, tile: secondary1 },
          { style: styles.item, tile: secondary2 }
        ]}
        colSeparatorStyle={styles.secondaryColSeparator}
      />
      <ItemColSeparator style={styles.secondaryColSeparator} />
      <VerticalLayout
        style={styles.supportContainer}
        tiles={[support1, support2]}
      />
    </View>
  );
};

SecondaryTwoNoPicAndTwoSlice.propTypes = {
  breakpoint: PropTypes.string,
  secondary1: PropTypes.node.isRequired,
  secondary2: PropTypes.node.isRequired,
  support1: PropTypes.node.isRequired,
  support2: PropTypes.node.isRequired
};

SecondaryTwoNoPicAndTwoSlice.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default SecondaryTwoNoPicAndTwoSlice;
