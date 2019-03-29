import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";

import Column from "../column";
import { ItemColSeparator } from "../shared";
import { propTypes, defaultProps } from "./proptypes";
import styleFactory from "./styles";

const LeadTwoNoPicAndTwoSlice = ({
  breakpoint,
  renderLead1,
  renderLead2,
  renderSupport1,
  renderSupport2
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.huge) {
    return (
      <View style={styles.container}>
        <Column style={styles.column} tiles={[renderLead1, renderLead2]} />
        <ItemColSeparator />
        <View style={styles.middleTile}>{renderSupport1()}</View>
        <ItemColSeparator />
        <View style={styles.column}>{renderSupport2()}</View>
      </View>
    );
  }

  if (breakpoint === editionBreakpoints.wide) {
    return (
      <View style={styles.container}>
        <Column style={styles.column} tiles={[renderLead1, renderLead2]} />
        <ItemColSeparator />
        <View style={styles.middleTile}>{renderSupport1()}</View>
        <ItemColSeparator />
        <View style={styles.column}>{renderSupport2()}</View>
      </View>
    );
  }

  if (breakpoint === editionBreakpoints.small) {
    return (
      <Column
        tiles={[renderLead1, renderLead2, renderSupport1, renderSupport2]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Column style={styles.column} tiles={[renderLead1, renderLead2]} />
      <ItemColSeparator />
      <Column style={styles.column} tiles={[renderSupport1, renderSupport2]} />
    </View>
  );
};

LeadTwoNoPicAndTwoSlice.propTypes = propTypes;
LeadTwoNoPicAndTwoSlice.defaultProps = defaultProps;

export default LeadTwoNoPicAndTwoSlice;
