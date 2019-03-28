import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import Column from "../column";
import propTypes from "./proptypes";
import styles from "./styles";
import { ItemColSeparator } from "../shared";

const CommentLeadAndCartoon = ({ breakpoint, children }) => {
  if (breakpoint === editionBreakpoints.small) {
    return <Column>{children}</Column>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.lead}>{children[0]}</View>
      <ItemColSeparator />
      <View style={styles.cartoon}>{children[1]}</View>
    </View>
  );
};

CommentLeadAndCartoon.propTypes = propTypes;

export default CommentLeadAndCartoon;
