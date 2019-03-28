import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";

import Column from "../column";
import { ItemColSeparator } from "../shared";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles";

const LeadTwoNoPicAndTwoSlice = ({ breakpoint, children }) => {
  if (breakpoint === editionBreakpoints.small) {
    return <Column>{children}</Column>;
  }

  return (
    <View style={styles.container}>
      <Column style={styles.column}>
        {children[0]}
        {children[1]}
      </Column>
      <ItemColSeparator />
      <Column style={styles.column}>
        {children[2]}
        {children[3]}
      </Column>
    </View>
  );
};

LeadTwoNoPicAndTwoSlice.propTypes = propTypes;
LeadTwoNoPicAndTwoSlice.defaultProps = defaultProps;

export default LeadTwoNoPicAndTwoSlice;
