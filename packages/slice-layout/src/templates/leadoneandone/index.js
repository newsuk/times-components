import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import HorizontalLayout from "../horizontallayout";
import styles from "./styles";

const leadOneAndOneSlice = ({ breakpoint, lead, support }) => {
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
    />
  );
};

leadOneAndOneSlice.propTypes = propTypes;
leadOneAndOneSlice.defaultProps = defaultProps;

export default leadOneAndOneSlice;
