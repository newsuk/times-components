import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import VerticalLayout from "../verticallayout";
import { ItemColSeparator, ItemRowSeparator } from "../shared";
import HorizontalLayout from "../horizontallayout";

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
      <View style={styles.secondaryItemContainer}>{secondary}</View>
      <ItemColSeparator style={styles.separator} />
      <View style={styles.supportsWrapper}>
        <HorizontalLayout
          containerStyle={styles.supportContainer}
          tiles={[
            { style: styles.supportItem, tile: support1 },
            { style: styles.supportItem, tile: support2 }
          ]}
          colSeparatorStyle={styles.separator}
        />
        <ItemRowSeparator style={styles.separator} />
        <HorizontalLayout
          containerStyle={styles.supportContainer}
          tiles={[
            { style: styles.supportItem, tile: support3 },
            { style: styles.supportItem, tile: support4 }
          ]}
          colSeparatorStyle={styles.separator}
        />
      </View>
    </View>
  );
};

SecondaryOneAndFourSlice.propTypes = {
  breakpoint: PropTypes.string,
  secondary: PropTypes.node.isRequired,
  support1: PropTypes.node.isRequired,
  support2: PropTypes.node.isRequired,
  support3: PropTypes.node.isRequired,
  support4: PropTypes.node.isRequired
};

SecondaryOneAndFourSlice.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default SecondaryOneAndFourSlice;
