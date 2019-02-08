import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const keySeperator = () => <View style={styles.keySeperator} />;

const Leaders = ({ renderLeader1, renderLeader2, renderLeader3 }) => (
  <View style={styles.container}>
    <Image
      resizeMode="contain"
      // eslint-disable-next-line global-require
      source={require("../../../assets/leaders-masthead.png")}
      style={styles.imageStyle}
    />
    <View style={styles.leadTextContainer}>
      <Text style={[styles.leadText, styles.text]}> Leading Articles </Text>
    </View>
    {renderLeader1()}
    {keySeperator()}
    {renderLeader2()}
    {keySeperator()}
    {renderLeader3()}
  </View>
);

Leaders.propTypes = propTypes;

export default Leaders;
