import {
  addSerializers,
  minimalNative
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "../src/markup";
import shared from "./shared.base";
import subscriptWithFallback from "../fixtures/subscript-fallback.json";
import superscriptWithFallback from "../fixtures/superscript-fallback.json";

export default () => {
  const renderComponent = TestRenderer.create;
  const tests = [
    {
      name: "subscript with fallback",
      test: () => {
        const output = renderComponent(
          renderTree(subscriptWithFallback, coreRenderers)
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "superscript with fallback",
      test: () => {
        const output = renderComponent(
          renderTree(superscriptWithFallback, coreRenderers)
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  addSerializers(expect, minimalNative);

  shared(renderComponent);
  iterator(tests);
};
