/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView } from "react-native";
import Context, { scales } from "@times-components/context";
import { LateralSpacingDecorator } from "@times-components/storybook";
import KeyFacts from "./src/key-facts";
import data from "./fixtures/key-facts-showcase.json";
import dataNoTitle from "./fixtures/key-facts-no-title-showcase.json";

const renderKeyFacts = ast => <KeyFacts ast={ast} onLinkPress={() => {}} />;

export default {
  name: "Composed/Key Facts",
  children: [
    {
      type: "decorator",
      decorator: LateralSpacingDecorator
    },
    {
      type: "story",
      name: "with title",
      platform: "native",
      component: ({ select }) => {
        const scale = select("Scale", scales, scales.medium);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            <ScrollView style={{ width: "100%" }}>
              {renderKeyFacts(data)}
            </ScrollView>
          </Context.Provider>
        );
      }
    },
    {
      type: "story",
      name: "with title",
      platform: "web",
      component: () => renderKeyFacts(data)
    },
    {
      type: "story",
      name: "without title",
      platform: "native",
      component: ({ select }) => {
        const scale = select("Scale", scales, scales.medium);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            <ScrollView style={{ width: "100%" }}>
              {renderKeyFacts(dataNoTitle)}
            </ScrollView>
          </Context.Provider>
        );
      }
    },
    {
      type: "story",
      name: "without title",
      platform: "web",
      component: () => renderKeyFacts(dataNoTitle)
    }
  ]
};
