/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView } from "react-native";
import { LateralSpacingDecorator } from "@times-components/storybook";
import KeyFacts from "./src/key-facts";
import data from "./fixtures/key-facts-showcase.json";

const { data: { children, attributes } } = data;

const renderKeyFacts = text => (
  <KeyFacts
    items={children[0].children}
    onLinkPress={() => {}}
    title={text("Key facts title: ", attributes.title)}
  />
);

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
      component: ({ text }) => (
        <ScrollView style={{ width: "100%" }}>
          {renderKeyFacts(text)}
        </ScrollView>
      )
    },
    {
      type: "story",
      name: "default",
      platform: "web",
      component: ({ text }) => renderKeyFacts(text)
    }
  ]
};
