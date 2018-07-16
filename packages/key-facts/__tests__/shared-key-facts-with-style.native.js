import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  hoistStyleTransform,
  minimalNativeTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts-tests.json";

const { data: { children, attributes } } = data;

export default () => {
  addSerializers(
    expect,
    compose(stylePrinter, hoistStyleTransform, minimalNativeTransform)
  );

  const tests = [
    {
      name: "key facts with title",
      test: () => {
        const testInstance = TestRenderer.create(
          <KeyFacts
            items={children[0].children}
            onLinkPress={() => {}}
            title={attributes.title}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "key facts without title",
      test: () => {
        const testInstance = TestRenderer.create(
          <KeyFacts items={children[0].children} onLinkPress={() => {}} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
