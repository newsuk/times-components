import React from "react";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import PropTypes from "prop-types";
import styleFactory from "./styles";
import VerticalLayout from "../verticallayout";
import HorizontalLayout from "../horizontallayout";

const Leaders = ({ leader1, leader2, leader3, breakpoint }) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return (
      <VerticalLayout
        style={styles.container}
        tiles={[leader1, leader2, leader3]}
      />
    );
  }

  return (
    <HorizontalLayout
      containerStyle={styles.container}
      tiles={[
        { style: styles.columnItems, tile: leader2 },
        { style: styles.columnItems, tile: leader1 },
        { style: styles.columnItems, tile: leader3 }
      ]}
      colSeparatorStyle={styles.itemColSeparator}
    />
  );
};

Leaders.propTypes = {
  leader1: PropTypes.node.isRequired,
  leader2: PropTypes.node.isRequired,
  leader3: PropTypes.node.isRequired,
  breakpoint: PropTypes.node.isRequired
};

export default Leaders;
