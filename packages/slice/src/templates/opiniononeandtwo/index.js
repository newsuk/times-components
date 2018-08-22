import React from "react";
import { View } from "react-native";
import styles from "../styles";
import { opinionConfig, supportConfig } from "./config";
import { propTypes, defaultProps } from "./proptypes";
import opinionStyles from "./styles";

const OpinionOneAndTwoSlice = ({
  renderOpinion,
  renderSupport1,
  renderSupport2
}) => {
  const support1 = renderSupport1(supportConfig);
  const support2 = renderSupport2(supportConfig);
  const supports = [support1, support2];
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={[styles.item, opinionStyles.opinion]}>
          {renderOpinion(opinionConfig)}
        </View>
      </View>
      {supports.filter(support => support).map(support => (
        <View key={support.props.id} style={styles.itemContainer}>
          <View style={styles.item}>{support}</View>
        </View>
      ))}
    </View>
  );
};

OpinionOneAndTwoSlice.propTypes = propTypes;
OpinionOneAndTwoSlice.defaultProps = defaultProps;

export default OpinionOneAndTwoSlice;
