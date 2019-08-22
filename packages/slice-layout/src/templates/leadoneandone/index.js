import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import HorizontalLayout from "../horizontallayout";
import styleFactory from "./styles";

const leadOneAndOneSlice = ({ breakpoint, lead, support }) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return (
      <View>
        {lead}
        <View style={styles.keyline} />
        {support}
      </View>
    );
  }

  return (
    <HorizontalLayout
      containerStyle={styles.container}
      tiles={[
        { style: styles.leadItem, tile: lead },
        { style: styles.supportItem, tile: support }
      ]}
      colSeparatorStyle={styles.colSeparatorStyle}
    />
  );
};

leadOneAndOneSlice.propTypes = propTypes;
leadOneAndOneSlice.defaultProps = defaultProps;

export default leadOneAndOneSlice;
