import React from "react";
import { Text, StyleSheet } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import DatePublication from "./date-publication";

const styles = StyleSheet.create({
  text: {
    color: "#696969",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "GillSansMTStd-Medium"
  }
});

storiesOf("DatePublication", module)
  .add("standard DatePublication GMT", () => (
    <Text style={styles.text}>
      <DatePublication
        date="2017-02-01T14:32:00.000Z"
        publication="SUNDAYTIMES"
        isDateGMT
        isGMT
      />
    </Text>
  ))
  .add("standard DatePublication BST", () => (
    <Text style={styles.text}>
      <DatePublication
        date="2017-07-01T14:32:00.000Z"
        publication="SUNDAYTIMES"
      />
    </Text>
  ));
