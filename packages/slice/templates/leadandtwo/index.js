import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "../styles";
import { leadAndTwoConfig, supportConfig } from "./config";

const LeadAndTwoSlice = ({ lead, support1, support2 }) => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View style={[styles.item, { paddingTop: 0 }]}>
        {lead(leadAndTwoConfig)}
      </View>
    </View>
    {[support1(supportConfig), support2(supportConfig)]
      .filter(support => support !== null)
      .map(support => (
        <View key={support[0].key} style={styles.itemContainer}>
          <View style={styles.item}>{support[0]}</View>
        </View>
      ))}
  </View>
);

LeadAndTwoSlice.propTypes = propTypes;
LeadAndTwoSlice.defaultProps = defaultProps;

export default LeadAndTwoSlice;
