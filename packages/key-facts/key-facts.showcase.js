/* eslint-disable react/prop-types */
import React from "react";
import invert from "lodash.invert";
import { ScrollView } from "react-native";
import Context from "@times-components/context";
import { LateralSpacingDecorator } from "@times-components/storybook";
import { colours, scales } from "@times-components/styleguide";
import KeyFacts from "./src/key-facts";
import data from "./fixtures/key-facts-showcase.json";
import dataNoTitle from "./fixtures/key-facts-no-title-showcase.json";

const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);
const selectScales = select => select("Scale", scales, scales.medium);

const renderKeyFacts = (ast, select) => {
  const scale = selectScales(select);
  const sectionColour = selectSection(select);
  return (
    <Context.Provider value={{ theme: { scale, sectionColour } }}>
      <KeyFacts ast={ast} onLinkPress={() => {}} />
    </Context.Provider>
  );
};

export default {
  children: [
    {
      decorator: LateralSpacingDecorator,
      type: "decorator"
    },
    {
      component: ({ select }) => (
        <ScrollView style={{ width: "100%" }}>
          {renderKeyFacts(data, select)}
        </ScrollView>
      ),
      name: "with title",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select }) => renderKeyFacts(data, select),
      name: "with title",
      platform: "web",
      type: "story"
    },
    {
      component: ({ select }) => (
        <ScrollView style={{ width: "100%" }}>
          {renderKeyFacts(dataNoTitle, select)}
        </ScrollView>
      ),
      name: "without title",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select }) => renderKeyFacts(dataNoTitle, select),
      name: "without title",
      platform: "web",
      type: "story"
    }
  ],
  name: "Composed/Key Facts"
};
