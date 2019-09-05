import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import PropTypes from "prop-types";
import styleFactory from "./styles";
import { ItemRowSeparator, ItemColSeparator } from "../shared";
import HorizontalLayout from "../horizontallayout";
import VerticalLayout from "../verticallayout";

const SecondaryFourSlice = ({
  breakpoint,
  secondary1,
  secondary2,
  secondary3,
  secondary4
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return (
      <Fragment>
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
            { style: styles.item, tile: secondary3 },
            { style: styles.item, tile: secondary4 }
          ]}
        />
      </Fragment>
    );
  }

  return (
    <View style={styles.container}>
      <HorizontalLayout
        containerStyle={styles.columnsContainer}
        tiles={[
          { style: styles.columnItem, tile: secondary1 },
          { style: styles.columnItem, tile: secondary2 }
        ]}
        colSeparatorStyle={styles.colSeparatorStyle}
      />
      <ItemColSeparator style={styles.colSeparatorStyle} />
      <VerticalLayout
        style={styles.rowsContainer}
        tiles={[secondary3, secondary4]}
      />
    </View>
  );
};

SecondaryFourSlice.propTypes = {
  breakpoint: PropTypes.string,
  secondary1: PropTypes.node.isRequired,
  secondary2: PropTypes.node.isRequired,
  secondary3: PropTypes.node.isRequired,
  secondary4: PropTypes.node.isRequired
};

SecondaryFourSlice.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default SecondaryFourSlice;
