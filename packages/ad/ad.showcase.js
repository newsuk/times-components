/* eslint-env browser */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Text } from "react-native";
import articleAdConfig from "@times-components/article/fixtures/article-ad-config.json";
import topicAdConfig from "@times-components/topic/fixtures/topic-ad-config.json";
import AdPlaceholder from "./src/ad-placeholder";
import Ad, { AdComposer } from "./src/ad";

const articleContextURL =
  "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";
const topicContextURL = "https://www.thetimes.co.uk/topic/chelsea";

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

  const adConfig = page === "topic" ? topicAdConfig : articleAdConfig;
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

const renderAd = ({ contextUrl, slotName }) => (
  <Fragment>
    {slotName.indexOf("pixel") !== -1 && (
      <Text style={{ display: "block" }}>
        The pixel ad is below. It is invisible.
      </Text>
    )}
    <Ad contextUrl={contextUrl} section="news" slotName={slotName} />
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
      name: "Ad - loading state placeholder",
      component: () =>
        withOpenInNewWindow(
          <Ad
            contextUrl={articleContextURL}
            isLoading
            section="news"
            slotName="header"
          />
        )
    },
    {
      type: "story",
      name: "Article Ad",
      component: ({ selectV2 }) =>
        withOpenInNewWindow(
          renderAd({
            contextUrl: articleContextURL,
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
            contextUrl: topicContextURL,
            slotName: selectV2("Slot Name:", slotNames, slotNames[1])
          }),
          "topic"
        )
    }
  ]
};
