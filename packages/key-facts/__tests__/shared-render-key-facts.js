import React from "react";
import { iterator } from "@times-components/test-utils";
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts-test.json";
import dataNoTitle from "../fixtures/key-facts-no-title-test.json";

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
    },
    {
      name: "key facts without title",
      test: () => {
        const output = renderComponent(
          <KeyFacts ast={dataNoTitle} onLinkPress={() => {}} />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
