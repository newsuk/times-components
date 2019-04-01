import React from "react";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import VerticalLayout from "../verticallayout";
import HorizontalLayout from "../horizontallayout";
import propTypes from "./proptypes";

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
    />
  );
};

Leaders.propTypes = propTypes;

export default Leaders;
