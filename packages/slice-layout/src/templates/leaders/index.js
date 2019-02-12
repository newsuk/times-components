import React from "react";
import { View } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const keySeperator = () => <View style={styles.keySeperator} />;

const Leaders = ({
  renderLeader1,
  renderLeader2,
  renderLeader3,
  renderHead
}) => (
  <View style={styles.container}>
    {renderHead()}
    {renderLeader1()}
    {keySeperator()}
    {renderLeader2()}
    {keySeperator()}
    {renderLeader3()}
  </View>
);

Leaders.propTypes = propTypes;

export default Leaders;
