/* eslint-env browser */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Text } from "react-native";
import AdPlaceholder from "./src/ad-placeholder";
import Ad, { AdComposer } from "./src/ad";
import pageTargeting from "./fixtures/page-options.json";
import biddersConfig from "./fixtures/bidders-config.json";

const placeholderSizes = ["default", "small", "mpu", "billboard"];

const renderAdPlaceholder = size => {
  if (size === placeholderSizes[1])
    return <AdPlaceholder height={90} width={728} />;
  if (size === placeholderSizes[2])
    return <AdPlaceholder height={250} width={300} />;
  if (size === placeholderSizes[3])
    return <AdPlaceholder height={250} width={970} />;

  return <AdPlaceholder height={50} width={700} />;
};

const adConfig = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  pageTargeting,
  slotTargeting: {
    sec_id: "null",
    section: "news",
    path: "/edition/news/",
    zone: "current_edition",
    slot: "news"
  },
  biddersConfig,
  bidderSlots: ["ad-header", "ad-article-inline"]
};

const withOpenInNewWindow = children => {
  const link = typeof document === "object" &&
    window !== window.top && (
      <a
        href={`/iframe.html${window.top.location.search}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in new window
      </a>
    );

  return (
    <AdComposer adConfig={adConfig}>
      <Fragment>
        {link}
        {children}
      </Fragment>
    </AdComposer>
  );
};

const slotNames = [
  "intervention",
  "header",
  "pixel",
  "pixelteads",
  "pixelskin"
];

const renderAd = slotName => (
  <Fragment>
    {slotName.indexOf("pixel") !== -1 && (
      <Text style={{ display: "block" }}>
        The pixel ad is below. It&rsquo;s invisible.
      </Text>
    )}
    <Ad
      contextUrl="https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s"
      section="news"
      slotName={slotName}
    />
  </Fragment>
);

export default {
  name: "Primitives/Advertisement",
  children: [
    {
      type: "story",
      name: "Placeholder",
      component: ({ selectV2 }) =>
        renderAdPlaceholder(
          selectV2(
            "Size of ad placeholder:",
            placeholderSizes,
            placeholderSizes[0]
          )
        )
    },
    {
      type: "story",
      name: "Ad",
      component: ({ selectV2 }) =>
        withOpenInNewWindow(
          renderAd(selectV2("Slot Name:", slotNames, slotNames[1]))
        )
    }
  ]
};
