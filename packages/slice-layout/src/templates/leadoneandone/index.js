import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator } from "../shared";
import styles from "./styles";

const leadOneAndOneSlice = ({ editionBreakpoint, renderLead, renderSupport }) =>
  editionBreakpoint === editionBreakpoints.medium ? (
    <View style={styles.container}>
      <View style={styles.leadItem}>{renderLead()}</View>
      <ItemColSeparator />
      <View style={styles.supportItem}>{renderSupport()}</View>
    </View>
  ) : (
    <View>
      {renderLead()}
      {renderSupport()}
    </View>
  );

leadOneAndOneSlice.propTypes = propTypes;
leadOneAndOneSlice.defaultProps = defaultProps;

export default leadOneAndOneSlice;
