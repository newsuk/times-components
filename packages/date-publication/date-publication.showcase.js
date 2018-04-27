import React from "react";
import { Text, StyleSheet } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";
import DatePublication from "./src/date-publication";

const styles = StyleSheet.create({
  text: {
    color: colours.functional.secondary,
    fontSize: fontSizes.cardMeta,
    lineHeight: 15,
    fontFamily: fonts.supporting
  }
});

export default {
  name: "Primitives/Date Publication",
  children: [
    {
      type: "story",
      name: "standard Date Publication",
      component: () => (
        <Text style={styles.text}>
          <DatePublication
            date="2017-07-01T14:32:00.000Z"
            publication="SUNDAYTIMES"
          />
        </Text>
      )
    },
    {
      type: "story",
      name: "Date Publication with publication not displayed",
      component: () => (
        <Text style={styles.text}>
          <DatePublication date="2017-07-01T14:32:00.000Z" />
        </Text>
      )
    }
  ]
};
