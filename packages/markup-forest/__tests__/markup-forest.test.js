import React from "react";
import { iterator } from "@times-components/test-utils";
import TestRenderer from "react-test-renderer";
import renderTrees, {
  renderTree,
  renderTreeAsText
} from "../src/markup-forest";
import bioAST from "../fixtures/bio.json";
import mixtureAST from "../fixtures/mixture.json";
import nestedAST from "../fixtures/nested.json";
import paragraphAST from "../fixtures/paragraphs.json";

iterator([
  {
    name: "no renderers",
    test() {
      expect(
        renderTree(
          [
            {
              attributes: {},
              children: [
                {
                  attributes: {
                    value: "some text here"
                  },
                  children: [],
                  name: "text"
                }
              ],
              name: "bold"
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
      const output = renderTree(mixtureAST, {
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
      const output = renderTree(nestedAST, {
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
      const output = renderTree(nestedAST, {
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
      const output = renderTree(nestedAST, {
        block(key, attributes, renderedChildren) {
          return {
            element: renderedChildren
          };
        },
        inline(key, attributes, renderedChildren) {
          return {
            element: renderedChildren
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
        text(key, attributes, renderedChildren) {
          return {
            element: renderedChildren
          };
        }
      });

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "provide AST of node for child",
    test: () => {
      const output = renderTree(nestedAST, {
        block(key, attributes, renderedChildren) {
          return {
            element: renderedChildren
          };
        },
        inline(key, attributes, renderedChildren) {
          return {
            element: renderedChildren
          };
        },
        specialElement(key, attributes, renderedChildren) {
          return {
            element: renderedChildren,
            shouldRenderChildren: false
          };
        },
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
      const output = renderTree(nestedAST, {
        block(key, attributes, renderedChildren) {
          return {
            element: renderedChildren
          };
        },
        inline(key, attributes, renderedChildren) {
          return {
            element: renderedChildren
          };
        },
        specialElement(key, attributes, renderedChildren) {
          return {
            element: renderedChildren,
            shouldRenderChildren: false
          };
        },
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
          {renderTrees(bioAST, {
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
          {renderTrees(paragraphAST, {
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
  },
  {
    name: "nested tags with a text only renderer",
    test: () => {
      const output = renderTreeAsText(nestedAST);

      expect(output).toMatchSnapshot();
    }
  }
]);
