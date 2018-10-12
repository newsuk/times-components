/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, Text } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";
import DatePublication from "./src/date-publication";

const styles = StyleSheet.create({
  text: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.cardMeta,
    lineHeight: 15
  }
});

const timezones = [
  "2017-07-01T04:32:00.000Z",
  "2017-01-01T04:32:00.000Z",
  "2017-07-01T14:32:00.000Z",
  "2017-01-01T14:32:00.000Z"
];

export default {
  name: "Primitives/Date Publication",
  children: [
    {
      type: "story",
      name: "Default",
      component: ({ selectV2 }) => (
        <Text style={styles.text}>
          <DatePublication
            date={selectV2("Date:", timezones, timezones[0])}
            publication="SUNDAYTIMES"
          />
        </Text>
      )
    },
    {
      type: "story",
      name: "Without Publication",
      component: () => (
        <Text style={styles.text}>
          <DatePublication date="2017-07-01T14:32:00.000Z" />
        </Text>
      )
    }
  ]
};
