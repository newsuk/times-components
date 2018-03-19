import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "../styles";
import { leadConfig, supportConfig } from "./config";

const LeadAndTwoSlice = ({ lead, support1, support2 }) => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View style={[styles.item, { paddingTop: 0 }]}>{lead(leadConfig)}</View>
    </View>
    {[support1(supportConfig), support2(supportConfig)]
      .filter(support => support !== null)
      .map(support => (
        <View key={support.props.id} style={styles.itemContainer}>
          <View style={styles.item}>{support}</View>
        </View>
      ))}
  </View>
);

LeadAndTwoSlice.propTypes = propTypes;
LeadAndTwoSlice.defaultProps = defaultProps;

export default LeadAndTwoSlice;
