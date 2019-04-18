/* eslint-disable react/prop-types */
import React from "react";
import invert from "lodash.invert";
import { ContextProviderWithDefaults } from "@times-components/context";
import Responsive from "@times-components/responsive";
import { colours, scales } from "@times-components/styleguide";
import KeyFacts from "./src/key-facts";

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);

const renderKeyFacts = ({ ast, select, hasScaling = false }) => {
  const scale = hasScaling ? selectScales(select) : null;
  const sectionColour = selectSection(select);
  return (
    <ContextProviderWithDefaults value={{ theme: { scale, sectionColour } }}>
      <Responsive>
        <KeyFacts ast={ast} onLinkPress={() => {}} />
      </Responsive>
    </ContextProviderWithDefaults>
  );
};

export default renderKeyFacts;
