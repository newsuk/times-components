import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import PropTypes from "prop-types";
import styleFactory from "./styles";
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
