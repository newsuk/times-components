import React from "react";
import { Text } from "react-native";
import { iterator } from "@times-components/test-utils";
import KeyFacts, { KeyFactsBullet } from "../src/key-facts";

const renderKeyFacts = title => (
  <KeyFacts title={title}>
    <KeyFactsBullet>
      <Text>List item 1</Text>
    </KeyFactsBullet>
    <KeyFactsBullet>
      <Text>List item 2</Text>
    </KeyFactsBullet>
    <KeyFactsBullet>
      <Text>List item 3a</Text>
      <Text>&nbsp;List item 3b</Text>
    </KeyFactsBullet>
  </KeyFacts>
);

export default renderComponent => {
  const tests = [
    {
      name: "key facts with title",
      test: () => {
        const output = renderComponent(
          renderKeyFacts("New Brexit referendum")
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "key facts without title",
      test: () => {
        const output = renderComponent(
          renderKeyFacts()
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
