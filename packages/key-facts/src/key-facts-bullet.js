import React from "react";
import { Text, View } from "react-native";
import propTypes from "./key-facts-shared-prop-types";
import styles from "./styles";

const KeyFactsBullet = ({ children }) => (
  <View style={styles.bulletContainer}>
    <View style={styles.bullet} />
    <Text style={styles.text}>{children}</Text>
  </View>
);

KeyFactsBullet.propTypes = propTypes;

export default KeyFactsBullet;
