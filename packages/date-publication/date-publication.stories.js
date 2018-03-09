import React from "react";
import { Text, StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { colours, fonts } from "@times-components/styleguide";
import DatePublication from "./date-publication";

const styles = StyleSheet.create({
  text: {
    color: colours.functional.secondary,
    fontSize: 13,
    lineHeight: 15,
    fontFamily: fonts.supporting
  }
});

storiesOf("Primitives/DatePublication", module)
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
