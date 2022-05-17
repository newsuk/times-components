/* eslint-disable react/no-array-index-key */
/* eslint-env browser */
import React from "react";
import { View, Text } from "react-native";
import { CenteredDecorator } from "@times-components/storybook";
import { fonts } from "@times-components/ts-styleguide";
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
      platform: "native",
      type: "decorator"
    },
    {
      component: () => (
        <View>{renderTrees(multiParagraph, coreRenderers)}</View>
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
        }),
      name: "Mixture of tags",
      type: "story"
    },
    {
      component: () => <Text>{renderTrees(bio, coreRenderers)}</Text>,
      name: "Biography",
      type: "story"
    },
    {
      component: () => <View>{renderTrees(ratings, coreRenderers)}</View>,
      name: "Ratings",
      type: "story"
    },
    {
      component: () => <View>{renderTrees(subscript, coreRenderers)}</View>,
      name: "Subscript",
      type: "story"
    },
    {
      component: () => <View>{renderTrees(superscript, coreRenderers)}</View>,
      name: "Superscript",
      type: "story"
    },
    {
      component: () => (
        <View>
          {renderTrees(multiParagraph, {
            ...coreRenderers,
            paragraph(key, attributes, children) {
              return {
                element: (
                  <Text
                    key={key}
                    style={{
                      color: "red",
                      fontFamily: fonts.headline,
                      margin: 10
                    }}
                  >
                    {children}
                  </Text>
                )
              };
            }
          })}
        </View>
      ),
      name: "Multiple children with styling",
      type: "story"
    }
  ],
  name: "Composed/Markup"
};
