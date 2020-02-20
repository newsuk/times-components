/* eslint-env browser */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Text } from "react-native";
import { NewTab } from "@times-components/storybook";
import Ad, { AdComposer } from "./src/ad";
import adConfig from "./fixtures/article-ad-config.json";

const withOpenInNewWindow = children => (
  <AdComposer adConfig={adConfig}>
    <Fragment>
      <NewTab />
      {children}
    </Fragment>
  </AdComposer>
);

const slotNames = [
  "intervention",
  "header",
  "mpu",
  "pixel",
  "pixelteads",
  "pixelskin"
];

const articleContextURL =
  "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";

const renderAd = slotName => (
  <Fragment>
    {slotName.indexOf("pixel") !== -1 && (
      <Text style={{ display: "block" }}>
        The pixel ad is below. It&rsquo;s invisible.
      </Text>
    )}
    <Ad contextUrl={articleContextURL} section="news" slotName={slotName} />
  </Fragment>
);

export default {
  children: [
    {
      component: ({ select }) =>
        withOpenInNewWindow(
          renderAd(select("Slot Name:", slotNames, slotNames[1]))
        ),
      name: "Ad",
      type: "story"
    }
  ],
  name: "Primitives/Advertisement"
};
