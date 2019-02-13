import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ItemRowSeparator } from "../shared";
import propTypes from "./proptypes";

const Leaders = ({
  renderLeader1,
  renderLeader2,
  renderLeader3,
  renderHead
}) => (
  <View style={styles.container}>
    {renderHead()}
    {renderLeader1()}
    <ItemRowSeparator />
    {renderLeader2()}
    <ItemRowSeparator />
    {renderLeader3()}
  </View>
);

Leaders.propTypes = propTypes;

export default Leaders;
