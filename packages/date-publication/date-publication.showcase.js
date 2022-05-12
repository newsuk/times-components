/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, Text } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/ts-styleguide";
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
  children: [
    {
      component: ({ select }) => (
        <Text style={styles.text}>
          <DatePublication
            date={select("Date:", timezones, timezones[0])}
            publication="SUNDAYTIMES"
          />
        </Text>
      ),
      name: "Default",
      type: "story"
    },
    {
      component: () => (
        <Text style={styles.text}>
          <DatePublication date="2017-07-01T14:32:00.000Z" />
        </Text>
      ),
      name: "Without Publication",
      type: "story"
    }
  ],
  name: "Primitives/Date Publication"
};
