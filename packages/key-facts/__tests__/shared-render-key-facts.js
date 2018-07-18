import React from "react";
import { iterator } from "@times-components/test-utils";
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts-test.json";

export default renderComponent => {
  const tests = [
    {
      name: "key facts with title",
      test: () => {
        const output = renderComponent(
          <KeyFacts ast={data} onLinkPress={() => {}} />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
