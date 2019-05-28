import React from "react";
import { View } from "react-native";
import { iterator } from "@times-components/test-utils";
import renderTrees, { renderTree } from "@times-components/markup-forest";
import coreRenderers from "../src/markup";
import paragraph from "../fixtures/paragraph.json";
import block from "../fixtures/block.json";
import bold from "../fixtures/bold.json";
import emphasis from "../fixtures/emphasis.json";
import inline from "../fixtures/inline.json";
import image from "../fixtures/image.json";
import italic from "../fixtures/italic.json";
import lineBreak from "../fixtures/break.json";
import script from "../fixtures/script.json";
import strong from "../fixtures/strong.json";
import subscript from "../fixtures/subscript.json";
import subscriptWithFallback from "../fixtures/subscript-fallback.json";
import superscript from "../fixtures/superscript.json";
import superscriptWithFallback from "../fixtures/superscript-fallback.json";

export default renderComponent => {
  const tests = [
    {
      name: "block",
      test: () => {
        const output = renderComponent(renderTree(block, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "bold",
      test: () => {
        const output = renderComponent(renderTree(bold, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "break",
      test: () => {
        const output = renderComponent(renderTree(lineBreak, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "emphasis",
      test: () => {
        const output = renderComponent(renderTree(emphasis, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "image tag",
      test: () => {
        const output = renderComponent(
          <View>{renderTrees(image, coreRenderers)}</View>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "inline",
      test: () => {
        const output = renderComponent(renderTree(inline, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "italic",
      test: () => {
        const output = renderComponent(renderTree(italic, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "paragraph",
      test: () => {
        const output = renderComponent(renderTree(paragraph, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "strong",
      test: () => {
        const output = renderComponent(renderTree(strong, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "subscript",
      test: () => {
        const output = renderComponent(renderTree(subscript, coreRenderers));

        expect(output).toMatchSnapshot();
      }
    },
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
      name: "superscript",
      test: () => {
        const output = renderComponent(renderTree(superscript, coreRenderers));

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
    },
    {
      name: "does not render a script tag",
      test: () => {
        const output = renderComponent(
          <View>{renderTrees(script, coreRenderers)}</View>
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
