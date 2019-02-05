import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const ListTwoAndSixNoPic = ({
  renderLead1,
  renderLead2,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4,
  renderSupport5,
  renderSupport6
}) => {
  const supportItems = [
    renderSupport1,
    renderSupport2,
    renderSupport3,
    renderSupport4,
    renderSupport5,
    renderSupport6
  ];

  const renderRowItem1 = renderLead1();
  const renderRowItem2 = renderLead2();
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <View key={renderRowItem1.props.id} style={styles.leadItem}>
          {renderRowItem1}
        </View>
        <View style={styles.keyRightSeparator} />
        <View key={renderRowItem2.props.id} style={styles.leadItem}>
          {renderRowItem2}
        </View>
      </View>
      <View style={styles.keyBottomSeparator} />
      {supportItems.map(item => (
        <View key={item().props.id}>
          {item()}
          <View style={styles.keyBottomSeparator} />
        </View>
      ))}
    </View>
  );
};

ListTwoAndSixNoPic.propTypes = propTypes;

export default ListTwoAndSixNoPic;
