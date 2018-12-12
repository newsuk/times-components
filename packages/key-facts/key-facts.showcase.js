/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView } from "react-native";
import { LateralSpacingDecorator } from "@times-components/storybook";
import data from "./fixtures/key-facts-showcase.json";
import dataNoTitle from "./fixtures/key-facts-no-title-showcase.json";
import renderKeyFacts from "./showcase-helper";

export default {
  children: [
    {
      decorator: LateralSpacingDecorator,
      type: "decorator"
    },
    {
      component: ({ select }) => (
        <ScrollView style={{ width: "100%" }}>
          {renderKeyFacts({ ast: data, hasScaling: true, select })}
        </ScrollView>
      ),
      name: "with title",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select }) => (
        <ScrollView style={{ width: "100%" }}>
          {renderKeyFacts({ ast: dataNoTitle, hasScaling: true, select })}
        </ScrollView>
      ),
      name: "without title",
      platform: "native",
      type: "story"
    }
  ],
  name: "Composed/Key Facts"
};
