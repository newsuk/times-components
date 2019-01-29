import React from "react";
import { View } from "react-native";
import { leadConfig, supportConfig } from "./config";
import { defaultProps, propTypes } from "./proptypes";
import styles from "../styles";

const LeadOneAndTwoSlice = ({
  renderLead,
  renderSupport1,
  renderSupport2,
  withSeparators
}) => {
  const support1 = renderSupport1(supportConfig);
  const support2 = renderSupport2(supportConfig);
  const supports = [support1, support2];
  return (
    <View style={styles.container}>
      <View
        style={
          withSeparators
            ? styles.itemContainer
            : styles.itemContainerWithoutBorders
        }
      >
        <View style={styles.item}>{renderLead(leadConfig)}</View>
      </View>
      {supports.filter(support => support).map(support => (
        <View
          key={support.props.id}
          style={
            withSeparators
              ? styles.itemContainer
              : styles.itemContainerWithoutBorders
          }
        >
          <View style={styles.item}>{support}</View>
        </View>
      ))}
    </View>
  );
};

LeadOneAndTwoSlice.propTypes = propTypes;
LeadOneAndTwoSlice.defaultProps = defaultProps;

export default LeadOneAndTwoSlice;
