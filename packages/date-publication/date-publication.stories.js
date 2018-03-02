import React from "react";
import { Text, StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { checkA11y } from "@storybook/addon-a11y";
import { fonts } from "@times-components/styleguide";
import DatePublication from "./date-publication";

const styles = StyleSheet.create({
  text: {
    color: "#696969",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: fonts.supporting
  }
});

storiesOf("Primitives/DatePublication", module)
  .addDecorator(checkA11y)
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
