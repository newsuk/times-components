import React from "react";
import { View } from "react-native";
import styles from "../styles";
import { opinionConfig, supportConfig } from "./config";
import { propTypes, defaultProps } from "./proptypes";
import opinionStyles from "./styles";

const OpinionOneAndTwoSlice = ({ opinion, renderSupports }) => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View style={[styles.item, opinionStyles.opinion]}>
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

OpinionOneAndTwoSlice.propTypes = propTypes;
OpinionOneAndTwoSlice.defaultProps = defaultProps;

export default OpinionOneAndTwoSlice;
