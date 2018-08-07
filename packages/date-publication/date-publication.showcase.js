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

export default {
  name: "Primitives/Date Publication",
  children: [
    {
      type: "story",
      name: "Default",
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
      name: "Without Publication",
      component: () => (
        <Text style={styles.text}>
          <DatePublication date="2017-07-01T14:32:00.000Z" />
        </Text>
      )
    }
  ]
};
