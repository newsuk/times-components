import React from "react";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { scales } from "@times-components/styleguide";
import KeyFacts from "../../src/key-facts";
import data from "../../fixtures/key-facts-test.json";

const styles = [
  "backgroundColor",
  "color",
  "flexDirection",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "height",
  "letterSpacing",
  "lineHeight",
  "marginBottom",
  "marginTop",
  "paddingLeft",
  "top",
  "transform",
  "width"
];

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    minimaliseTransform(
      (value, key) => key !== "className" || key !== "styles"
    ),
    minimalWebTransform,
    rnwTransform(styles)
  )
);

it("key facts with title", () => {
  const testInstance = TestRenderer.create(
    <KeyFacts ast={data} onLinkPress={() => {}} />
  );

  expect(testInstance).toMatchSnapshot();
});

it("key facts with title and context theme", () => {
  const scale = scales.large;
  const sectionColour = "#FFFFFF";

  const testInstance = TestRenderer.create(
    <Context.Provider value={{ theme: { scale, sectionColour } }}>
      <KeyFacts ast={data} onLinkPress={() => {}} />
    </Context.Provider>
  );

  expect(testInstance).toMatchSnapshot();
});

// eslint-disable-next-line global-require
require("jest-styled-components");
