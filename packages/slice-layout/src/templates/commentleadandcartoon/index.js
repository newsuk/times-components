import React from "react";
import { editionBreakpoints } from "@times-components/styleguide";
import VerticalLayout from "../verticallayout";
import HorizontalLayout from "../horizontallayout";
import propTypes from "./proptypes";
import styles from "./styles";

const CommentLeadAndCartoon = ({ breakpoint, lead, cartoon }) => {
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
