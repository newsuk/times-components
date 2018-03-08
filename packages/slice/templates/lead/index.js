import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "../styles";

const LeadSlice = ({ lead, support1, support2 }) => {
  const leadConfig = {};

  const supportConfig = {
    showImage: false,
    showSummary: false
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={[styles.item, { paddingTop: 0 }]}>{lead(leadConfig)}</View>
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
};

LeadSlice.propTypes = propTypes;
LeadSlice.defaultProps = defaultProps;

export default LeadSlice;
