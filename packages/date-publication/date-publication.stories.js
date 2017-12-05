import React from "react";
import { Text, StyleSheet } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import DatePublication from "./date-publication";

const props = {
  date: new Date("2017-07-01T14:32:00.000Z"),
  publication: "SUNDAYTIMES"
};

const styles = StyleSheet.create({
  text: {
    color: "#696969",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "GillSansMTStd-Medium"
  }
});

storiesOf("DatePublication", module).add("standard DatePublication", () => (
  <Text style={styles.text}>
    <DatePublication {...props} />
  </Text>
));
