import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";

import Column from "../column";
import { ItemColSeparator, ItemRowSeparator } from "../shared";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles";

const LeadTwoNoPicAndTwoSlice = ({
  breakpoint,
  renderLead1,
  renderLead2,
  renderSupport1,
  renderSupport2
}) => {
  if (breakpoint === editionBreakpoints.medium) {
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {renderLead1()}
          <ItemRowSeparator />
          {renderLead2()}
        </View>
        <ItemColSeparator />
        <View style={styles.column}>
          {renderSupport1()}
          <ItemRowSeparator />
          {renderSupport2()}
        </View>
      </View>
    );
  }

  return (
    <Column
      tiles={[renderLead1, renderLead2, renderSupport1, renderSupport2]}
    />
  );
};

LeadTwoNoPicAndTwoSlice.propTypes = propTypes;
LeadTwoNoPicAndTwoSlice.defaultProps = defaultProps;

export default LeadTwoNoPicAndTwoSlice;
