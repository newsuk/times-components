import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator } from "../shared";
import styles from "./styles";

const leadOneAndOneSlice = ({ breakpoint, children: [lead, support] }) => {
  if (breakpoint === editionBreakpoints.small) {
    return (
      <View>
        {lead}
        {support}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leadItem}>{lead}</View>
      <ItemColSeparator />
      <View style={styles.supportItem}>{support}</View>
    </View>
  );
};

leadOneAndOneSlice.propTypes = propTypes;
leadOneAndOneSlice.defaultProps = defaultProps;

export default leadOneAndOneSlice;
