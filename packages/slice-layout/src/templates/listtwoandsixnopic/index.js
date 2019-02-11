import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ItemRowSeparator, ItemColSeparator } from "../shared";
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
        <ItemColSeparator />
        <View key={renderRowItem2.props.id} style={styles.leadItem}>
          {renderRowItem2}
        </View>
      </View>
      <ItemRowSeparator />
      {supportItems.map((item, index) => (
        <View key={item().props.id}>
          {item()}
          {supportItems.length - 1 > index ? <ItemRowSeparator /> : null}
        </View>
      ))}
    </View>
  );
};

ListTwoAndSixNoPic.propTypes = propTypes;

export default ListTwoAndSixNoPic;
