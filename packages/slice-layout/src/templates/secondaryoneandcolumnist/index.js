import React from "react";
import { editionBreakpoints } from "@times-components/styleguide";
import VerticalLayout from "../verticallayout";
import HorizontalLayout from "../horizontallayout";
import styleFactory from "./styles";
import propTypes from "./proptypes";

const SecondaryOneAndColumnistSlice = ({
  breakpoint,
  secondary,
  columnist
}) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    return <VerticalLayout tiles={[secondary, columnist]} />;
  }

  return (
    <HorizontalLayout
      containerStyle={styles.container}
      tiles={[
        { style: styles.secondaryContainer, tile: secondary },
        { style: styles.columnistContainer, tile: columnist }
      ]}
    />
  );
};

SecondaryOneAndColumnistSlice.propTypes = propTypes;

export default SecondaryOneAndColumnistSlice;
