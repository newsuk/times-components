import React from "react";
import { View } from "react-native";
import styles from "../styles";
import { propTypes, defaultProps } from "./proptypes";
import { leadConfig, supportConfig } from "./config";

const LeadOneAndTwoSlice = ({ lead, renderSupports }) => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View style={styles.item}>{lead(leadConfig)}</View>
    </View>
    {renderSupports(supportConfig).map(support => (
      <View key={support.props.id} style={styles.itemContainer}>
        <View style={styles.item}>{support}</View>
      </View>
    ))}
  </View>
);

LeadOneAndTwoSlice.propTypes = propTypes;
LeadOneAndTwoSlice.defaultProps = defaultProps;

export default LeadOneAndTwoSlice;
