/* eslint-disable react/prop-types */
import React from "react";
import invert from "lodash.invert";
import Context from "@times-components/context";
import { colours, scales } from "@times-components/styleguide";
import KeyFacts from "./src/key-facts";

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", invert(colours.section), colours.section.default);

const renderKeyFacts = ({ ast, select, hasScaling = false }) => {
  const scale = hasScaling ? selectScales(select) : null;
  const sectionColour = selectSection(select);
  return (
    <Context.Provider value={{ theme: { scale, sectionColour } }}>
      <KeyFacts ast={ast} onLinkPress={() => {}} />
    </Context.Provider>
  );
};

export default renderKeyFacts;
