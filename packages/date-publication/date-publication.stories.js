import React from "react";
import { Text, StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
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
  .add("standard DatePublication", () => (
    <Text style={styles.text}>
      <DatePublication
        date="2017-07-01T14:32:00.000Z"
        publication="SUNDAYTIMES"
      />
    </Text>
  ))
  .add("DatePublication with publication not displayed", () => (
    <Text style={styles.text}>
      <DatePublication date="2017-07-01T14:32:00.000Z" />
    </Text>
  ));
