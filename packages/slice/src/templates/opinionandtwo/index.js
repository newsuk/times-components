import React from "react";
import { View } from "react-native";
import styles from "../styles";
import { opinionConfig, supportConfig } from "./config";
import { propTypes, defaultProps } from "./proptypes";
import opinionAndTwoStyles from "./styles";

const OpinionAndTwoSlice = ({ opinion, renderSupports }) => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View style={[styles.item, opinionAndTwoStyles.opinion]}>
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
