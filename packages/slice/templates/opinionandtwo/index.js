import React from "react";
import { View } from "react-native";
import { propTypes, defaultProps } from "./proptypes";
import styles from "../styles";
import { opinionConfig, supportConfig } from "./config";

const OpinionAndTwoSlice = ({ opinion, renderSupports }) => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View style={[styles.item, { paddingTop: 0 }]}>
        {opinion(opinionConfig)}
      </View>
    </View>
    {renderSupports(supportConfig).map(support => (
      <View key={support.props.id} style={styles.itemContainer}>
        <View style={styles.item}>{support}</View>
      </View>
    ))}
  </View>
);

OpinionAndTwoSlice.propTypes = propTypes;
OpinionAndTwoSlice.defaultProps = defaultProps;

export default OpinionAndTwoSlice;
