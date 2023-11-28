/* eslint-disable react/no-array-index-key */
/* eslint-env browser */
import React from "react";
import { TcText, TcView } from "@times-components/utils";
import { CenteredDecorator } from "@times-components/storybook";
import { fontsWithFallback } from "@times-components/ts-styleguide";
import renderTrees, { renderTree } from "@times-components/markup-forest";
import coreRenderers from "./src/markup";

const multiParagraph = require("./fixtures/multi-paragraph.json");
const mixture = require("./fixtures/tag-mixture.json");
const bio = require("./fixtures/bio.json");
const ratings = require("./fixtures/ratings.json");
const subscript = require("./fixtures/multiple-subscripts.json");
const superscript = require("./fixtures/multiple-superscripts.json");

export default {
  children: [
    {
      decorator: CenteredDecorator,
      platform: "web",
      type: "decorator"
    },
    {
      component: () => (
        <TcView>{renderTrees(multiParagraph, coreRenderers)}</TcView>
      ),
      name: "Multiple paragraphs",
      type: "story"
    },
    {
      component: () =>
        renderTree(mixture, {
          ...coreRenderers,
          block(key, attributes, renderedChildren) {
            return {
              element: <TcView key={key}>{renderedChildren}</TcView>
            };
          },
          link(key, attributes, renderedChildren) {
            return {
              element: (
                <TcText href={attributes.href} key={key}>
                  {renderedChildren}
                </TcText>
              )
            };
          }
        }),
      name: "Mixture of tags",
      type: "story"
    },
    {
      component: () => <TcText>{renderTrees(bio, coreRenderers)}</TcText>,
      name: "Biography",
      type: "story"
    },
    {
      component: () => <TcView>{renderTrees(ratings, coreRenderers)}</TcView>,
      name: "Ratings",
      type: "story"
    },
    {
      component: () => <TcView>{renderTrees(subscript, coreRenderers)}</TcView>,
      name: "Subscript",
      type: "story"
    },
    {
      component: () => (
        <TcView>{renderTrees(superscript, coreRenderers)}</TcView>
      ),
      name: "Superscript",
      type: "story"
    },
    {
      component: () => (
        <TcView>
          {renderTrees(multiParagraph, {
            ...coreRenderers,
            paragraph(key, attributes, children) {
              return {
                element: (
                  <TcText
                    key={key}
                    style={{
                      color: "red",
                      fontFamily: fontsWithFallback.headline,
                      margin: 10
                    }}
                  >
                    {children}
                  </TcText>
                )
              };
            }
          })}
        </TcView>
      ),
      name: "Multiple children with styling",
      type: "story"
    }
  ],
  name: "Composed/Markup"
};
