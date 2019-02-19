import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator } from "../shared";
import styles from "./styles";

const leadOneAndOneSlice = ({ breakpoint, renderLead, renderSupport }) => {
  if (breakpoint === editionBreakpoints.small) {
    return (
      <View>
        {renderLead()}
        {renderSupport()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leadItem}>{renderLead()}</View>
      <ItemColSeparator />
      <View style={styles.supportItem}>{renderSupport()}</View>
    </View>
  );
};

leadOneAndOneSlice.propTypes = propTypes;
leadOneAndOneSlice.defaultProps = defaultProps;

export default leadOneAndOneSlice;
