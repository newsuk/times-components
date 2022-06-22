import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { ItemColSeparator } from "../shared";
import styleFactory from "./styles";
import VerticalLayout from "../verticallayout";

const LeadTwoNoPicAndTwoSlice = ({
  breakpoint,
  lead1,
  lead2,
  support1,
  support2
}) => {
  const styles = styleFactory(breakpoint);

  if (
    breakpoint === editionBreakpoints.wide ||
    breakpoint === editionBreakpoints.huge
  ) {
    return (
      <TcView style={styles.container}>
        <VerticalLayout style={styles.column} tiles={[lead1, lead2]} />
        <ItemColSeparator style={styles.colSeparatorStyle} />
        <TcView style={styles.middleTile}>{support1}</TcView>
        <ItemColSeparator style={styles.colSeparatorStyle} />
        <TcView style={styles.column}>{support2}</TcView>
      </TcView>
    );
  }

  if (breakpoint === editionBreakpoints.medium) {
    return (
      <TcView style={styles.container}>
        <VerticalLayout style={styles.column} tiles={[lead1, lead2]} />
        <ItemColSeparator style={styles.colSeparatorStyle} />
        <VerticalLayout style={styles.column} tiles={[support1, support2]} />
      </TcView>
    );
  }

  return <VerticalLayout tiles={[lead1, lead2, support1, support2]} />;
};

LeadTwoNoPicAndTwoSlice.propTypes = {
  breakpoint: PropTypes.string,
  lead1: PropTypes.node.isRequired,
  lead2: PropTypes.node.isRequired,
  support1: PropTypes.node.isRequired,
  support2: PropTypes.node.isRequired
};

LeadTwoNoPicAndTwoSlice.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default LeadTwoNoPicAndTwoSlice;
