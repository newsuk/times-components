import React from "react";
import { Text, StyleSheet } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import DatePublication from "./date-publication";

const props = {
  date: "2017-07-01T14:32:00.000Z",
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

storiesOf("DatePublication", module)
  .add("standard DatePublication", () => (
    <Text style={styles.text}>
      <DatePublication {...props} />
    </Text>
  ))
  .add("DatePublication with publication not displayed", () => (
    <Text style={styles.text}>
      <DatePublication {...props} showPublication={false} />
    </Text>
  ));
