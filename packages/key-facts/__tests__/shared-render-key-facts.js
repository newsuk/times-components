import React from "react";
import { iterator } from "@times-components/test-utils";
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts-test.json";

const { data: { children, attributes } } = data;

const renderKeyFacts = title => (
  <KeyFacts ast={children[0].children} onLinkPress={() => {}} title={title} />
);

export default renderComponent => {
  const tests = [
    {
      name: "key facts with title",
      test: () => {
        const output = renderComponent(renderKeyFacts(attributes.title));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "key facts without title",
      test: () => {
        const output = renderComponent(renderKeyFacts());

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
