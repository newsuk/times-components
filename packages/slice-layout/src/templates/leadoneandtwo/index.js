import React from "react";
import { View } from "react-native";
import { leadConfig, supportConfig } from "./config";
import propTypes from "./proptypes";
import styles from "../styles";

const LeadOneAndTwoSlice = ({ renderLead, renderSupport1, renderSupport2 }) => {
  const support1 = renderSupport1(supportConfig);
  const support2 = renderSupport2(supportConfig);
  const supports = [support1, support2];
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>{renderLead(leadConfig)}</View>
      </View>
      {supports.filter(support => support).map(support => (
        <View key={support.props.id} style={styles.itemContainer}>
          <View style={styles.item}>{support}</View>
        </View>
      ))}
    </View>
  );
};

LeadOneAndTwoSlice.propTypes = propTypes;

export default LeadOneAndTwoSlice;
