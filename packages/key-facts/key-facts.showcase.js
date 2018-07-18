/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView } from "react-native";
import { LateralSpacingDecorator } from "@times-components/storybook";
import KeyFacts from "./src/key-facts";
import data from "./fixtures/key-facts-showcase.json";

const renderKeyFacts = () => <KeyFacts ast={data} onLinkPress={() => {}} />;

export default {
  name: "Composed/Key Facts",
  children: [
    {
      type: "decorator",
      decorator: LateralSpacingDecorator
    },
    {
      type: "story",
      name: "default",
      platform: "native",
      component: () => (
        <ScrollView style={{ width: "100%" }}>{renderKeyFacts()}</ScrollView>
      )
    },
    {
      type: "story",
      name: "default",
      platform: "web",
      component: () => renderKeyFacts()
    }
  ]
};
