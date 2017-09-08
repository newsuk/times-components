/* eslint-env browser */

import { View, Platform } from "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import Article from "../article";

const renderIframe = () => {
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <a
      href={`/iframe.html${window.top.location.search}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Render ads
    </a>
  );
};

storiesOf("Article", module).add("Article", () => (
  <View>
    {renderIframe()}
    <Article />
  </View>
));
