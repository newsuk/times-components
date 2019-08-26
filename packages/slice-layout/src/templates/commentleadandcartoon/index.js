import React from "react";
import { editionBreakpoints } from "@times-components/styleguide";
import VerticalLayout from "../verticallayout";
import HorizontalLayout from "../horizontallayout";
import propTypes from "./proptypes";
import styleFactory from "./styles";

const CommentLeadAndCartoon = ({ breakpoint, lead, cartoon }) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return <VerticalLayout tiles={[lead, cartoon]} />;
  }

  return (
    <HorizontalLayout
      containerStyle={styles.container}
      tiles={[
        { style: styles.lead, tile: lead },
        { style: styles.cartoon, tile: cartoon }
      ]}
    />
  );
};

CommentLeadAndCartoon.propTypes = propTypes;

export default CommentLeadAndCartoon;
