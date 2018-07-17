import React from "react";
import { Text, View } from "react-native";
import { iterator } from "@times-components/test-utils";
import { renderTree, renderTrees } from "../src/markup";
import multiParagraphWithPullQuote from "../fixtures/multi-paragraph-with-pullquote";

const singleParagraph = require("../fixtures/single-paragraph.json");
const multiParagraph = require("../fixtures/multi-paragraph.json");
const bold = require("../fixtures/bold.json");
const italic = require("../fixtures/italic.json");
const span = require("../fixtures/span.json");
const lineBreak = require("../fixtures/line-break.json");
const mixture = require("../fixtures/tag-mixture.json");
const nested = require("../fixtures/nested.json");
const bio = require("../fixtures/bio.json");
const script = require("../fixtures/script.json");
const image = require("../fixtures/image.json");

export default renderComponent => {
  const tests = [
    {
      name: "single paragraph",
      test: () => {
        const output = renderComponent(renderTree(singleParagraph));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "multiple paragraphs",
      test: () => {
        const output = renderComponent(
          <View>{renderTrees(multiParagraph)}</View>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "multiple paragraphs with a pull quote",
      test: () => {
        const output = renderComponent(
          <View>
            {renderTrees(
              multiParagraphWithPullQuote({ pullQuote: "Some pull quote" })
            )}
          </View>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "bold tag",
      test: () => {
        const output = renderComponent(renderTree(bold));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "italic tag",
      test: () => {
        const output = renderComponent(renderTree(italic));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "span tag",
      test: () => {
        const output = renderComponent(renderTree(span));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "line break tag",
      test: () => {
        const output = renderComponent(renderTree(lineBreak));

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "mixture of tags",
      test: () => {
        const output = renderComponent(
          renderTree(mixture, {
            block(key, attributes, renderedChildren) {
              return {
                element: <View key={key}>{renderedChildren}</View>
              };
            },
            link(key, attributes, renderedChildren) {
              return {
                element: (
                  <Text href={attributes.href} key={key}>
                    {renderedChildren}
                  </Text>
                )
              };
            }
          })
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "nested tags",
      test: () => {
        const output = renderComponent(
          renderTree(nested, {
            block(key, attributes, renderedChildren) {
              return {
                element: <Text key={key}>{renderedChildren}</Text>
              };
            }
          })
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "ignore children of nested tags",
      test: () => {
        const output = renderComponent(
          renderTree(nested, {
            specialElement(key, attributes, renderedChildren) {
              return {
                element: <Text key={key}>{renderedChildren}</Text>,
                shouldRenderChildren: false
              };
            }
          })
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "provide AST of node",
      test: () => {
        const output = renderComponent(
          renderTree(nested, {
            specialElement(key, attributes, renderedChildren, indx, node) {
              return {
                element: (
                  <Text key={key}>{`special: ${JSON.stringify(node)}`}</Text>
                ),
                shouldRenderChildren: false
              };
            }
          })
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "provide AST of node for child",
      test: () => {
        const output = renderComponent(
          renderTree(nested, {
            text(key, attributes, renderedChildren, indx, node) {
              return {
                element: (
                  <Text key={key}>{`special: ${JSON.stringify(node)}`}</Text>
                )
              };
            }
          })
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "provide empty children",
      test: () => {
        const output = renderComponent(
          renderTree(nested, {
            text(key, attributes, renderedChildren) {
              return {
                element: <Text key={key}>{renderedChildren.length}</Text>
              };
            }
          })
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "wrapped tags",
      test: () => {
        const output = renderComponent(<Text>{renderTrees(bio)}</Text>);

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "multiple children",
      test: () => {
        const output = renderComponent(
          <Text style={{ color: "red" }}>{renderTrees(multiParagraph)}</Text>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "does not render a script tag",
      test: () => {
        const output = renderComponent(<View>{renderTrees(script)}</View>);

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "image tag",
      test: () => {
        const output = renderComponent(<View>{renderTrees(image)}</View>);

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
