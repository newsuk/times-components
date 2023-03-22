/* eslint-disable react/prop-types */
import React from "react";
import { TcText } from "@times-components/utils";
import {
  colours,
  fontsWithFallback,
  fontSizes
} from "@times-components/ts-styleguide";
import DatePublication from "./src/date-publication";

const styles = {
  text: {
    color: colours.functional.secondary,
    fontFamily: fontsWithFallback.supporting,
    fontSize: fontSizes.cardMeta,
    lineHeight: "15px"
  }
};

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
        <TcText style={styles.text}>
          <DatePublication
            date={select("Date:", timezones, timezones[0])}
            publication="SUNDAYTIMES"
          />
        </TcText>
      ),
      name: "Default",
      type: "story"
    },
    {
      component: () => (
        <TcText style={styles.text}>
          <DatePublication date="2017-07-01T14:32:00.000Z" />
        </TcText>
      ),
      name: "Without Publication",
      type: "story"
    }
  ],
  name: "Primitives/Date Publication"
};
