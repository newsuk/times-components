import React from "react";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import PropTypes from "prop-types";
import VerticalLayout from "../verticallayout";
import HorizontalLayout from "../horizontallayout";
import styleFactory from "./styles";

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
        { style: styles.columnistContainer, tile: columnist },
        { style: styles.secondaryContainer, tile: secondary }
      ]}
      colSeparatorStyle={styles.colSeparator}
    />
  );
};

SecondaryOneAndColumnistSlice.propTypes = {
  breakpoint: PropTypes.string,
  columnist: PropTypes.node.isRequired,
  secondary: PropTypes.node.isRequired
};

SecondaryOneAndColumnistSlice.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default SecondaryOneAndColumnistSlice;
