import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import Column from "../column";
import propTypes from "./proptypes";
import styles from "./styles";
import { ItemColSeparator } from "../shared";

const CommentLeadAndCartoon = ({ breakpoint, renderLead, renderCartoon }) => {
  if (breakpoint === editionBreakpoints.small) {
    return <Column tiles={[renderLead, renderCartoon]} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.lead}>{renderLead()}</View>
      <ItemColSeparator />
      <View style={styles.cartoon}>{renderCartoon()}</View>
    </View>
  );
};

CommentLeadAndCartoon.propTypes = propTypes;

export default CommentLeadAndCartoon;
