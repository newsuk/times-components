/* eslint-env browser */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Text } from "react-native";
import topicAdConfig from "@times-components/topic/fixtures/topic-ad-config.json";
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

const devNetworkId = "25436805";
const adConfigBase = { networkId: devNetworkId, adUnit: "d.thetimes.co.uk" };

// @TODO: move this to the article package much the same as the topic example config
const articleConfig = {
  ...adConfigBase,
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

const withOpenInNewWindow = (children, page) => {
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

  const adConfig = page === "topic" ? topicAdConfig : articleConfig;
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

const renderAd = ({ articleUrl, slotName }) => (
  <Fragment>
    {slotName.indexOf("pixel") !== -1 && (
      <Text style={{ display: "block" }}>
        The pixel ad is below. It&rsquo;s invisible.
      </Text>
    )}
    <Ad contextUrl={articleUrl} section="news" slotName={slotName} />
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
      name: "Article Ad",
      component: ({ selectV2 }) =>
        withOpenInNewWindow(
          renderAd({
            articleUrl:
              "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s",
            slotName: selectV2("Slot Name:", slotNames, slotNames[1])
          }),
          "article"
        )
    },
    {
      type: "story",
      name: "Topics Ad",
      component: ({ selectV2 }) =>
        withOpenInNewWindow(
          renderAd({
            articleUrl: "https://www.thetimes.co.uk/topic/chelsea",
            slotName: selectV2("Slot Name:", slotNames, slotNames[1])
          }),
          "topic"
        )
    }
  ]
};
