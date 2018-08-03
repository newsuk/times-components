import React from "react";
import { iterator } from "@times-components/test-utils";
import TestRenderer from "react-test-renderer";
import renderTrees, { renderTree } from "../src/markup-forest";
import bio from "../fixtures/bio.json";
import mixture from "../fixtures/mixture.json";
import nested from "../fixtures/nested.json";
import paragraphs from "../fixtures/paragraphs.json";

iterator([
  {
    name: "no renderers",
    test() {
      expect(
        renderTree(
          [
            {
              name: "bold",
              attributes: {},
              children: [
                {
                  name: "text",
                  attributes: {
                    value: "some text here"
                  },
                  children: []
                }
              ]
            }
          ],
          {}
        )
      ).toMatchSnapshot();
    }
  },
  {
    name: "mixture of tags",
    test: () => {
      const output = renderTree(mixture, {
        block(key, attributes, renderedChildren) {
          return {
            element: <div key={key}>{renderedChildren}</div>
          };
        },
        link(key, attributes, renderedChildren) {
          return {
            element: (
              <a href={attributes.href} key={key}>
                {renderedChildren}
              </a>
            )
          };
        },
        text(key, { value }) {
          return {
            element: value
          };
        }
      });

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "nested tags",
    test: () => {
      const output = renderTree(nested, {
        block(key, attributes, renderedChildren) {
          return {
            element: <div key={key}>{renderedChildren}</div>
          };
        },
        inline(key, attributes, renderedChildren) {
          return {
            element: <span key={key}>{renderedChildren}</span>
          };
        },
        text(key, { value }) {
          return {
            element: value
          };
        }
      });

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "ignore children of nested tags",
    test: () => {
      const output = renderTree(nested, {
        block(key, attributes, renderedChildren) {
          return {
            element: <div key={key}>{renderedChildren}</div>
          };
        },
        inline(key, attributes, renderedChildren) {
          return {
            element: <span key={key}>{renderedChildren}</span>
          };
        },
        specialElement(key, attributes, renderedChildren) {
          return {
            element: <special key={key}>{renderedChildren}</special>,
            shouldRenderChildren: false
          };
        },
        text(key, { value }) {
          return {
            element: value
          };
        }
      });

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "provide AST of node",
    test: () => {
      const output = renderTree(nested, {
        block(key, attributes, renderedChildren) {
          return {
            element: <div key={key}>{renderedChildren}</div>
          };
        },
        inline(key, attributes, renderedChildren) {
          return {
            element: <span key={key}>{renderedChildren}</span>
          };
        },
        specialElement(key, attributes, renderedChildren, indx, node) {
          return {
            element: (
              <special key={key}>{`special: ${JSON.stringify(node)}`}</special>
            ),
            shouldRenderChildren: false
          };
        },
        text(key, { value }) {
          return {
            element: value
          };
        }
      });

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "provide AST of node for child",
    test: () => {
      const output = renderTree(nested, {
        text(key, attributes, renderedChildren, indx, node) {
          return {
            element: <div key={key}>{`special: ${JSON.stringify(node)}`}</div>
          };
        }
      });

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "provide empty children",
    test: () => {
      const output = renderTree(nested, {
        text(key, attributes, renderedChildren) {
          return {
            element: <div key={key}>{renderedChildren.length}</div>
          };
        }
      });

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "wrapped tags",
    test: () => {
      const output = TestRenderer.create(
        <div>
          {renderTrees(bio, {
            bold(key, attributes, renderedChildren) {
              return {
                element: <strong key={key}>{renderedChildren}</strong>
              };
            },
            italic(key, attributes, renderedChildren) {
              return {
                element: <em key={key}>{renderedChildren}</em>
              };
            },
            text(key, { value }) {
              return {
                element: value
              };
            }
          })}
        </div>
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "multiple children",
    test: () => {
      const output = TestRenderer.create(
        <div>
          {renderTrees(paragraphs, {
            paragraph(key, attributes, renderedChildren) {
              return {
                element: <p key={key}>{renderedChildren}</p>
              };
            },
            text(key, { value }) {
              return {
                element: value
              };
            }
          })}
        </div>
      );

      expect(output).toMatchSnapshot();
    }
  }
]);
