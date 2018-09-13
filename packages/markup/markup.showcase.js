/* eslint-disable react/no-array-index-key */
/* eslint-env browser */
import React from "react";
import { View, Text } from "react-native";
import { CenteredDecorator } from "@times-components/storybook";
import { fonts } from "@times-components/styleguide";
import renderTrees, { renderTree } from "@times-components/markup-forest";
import coreRenderers from "./src/markup";

const multiParagraph = require("./fixtures/multi-paragraph.json");
const mixture = require("./fixtures/tag-mixture.json");
const bio = require("./fixtures/bio.json");
const ratings = require("./fixtures/ratings.json");
const subscript = require("./fixtures/multiple-subscripts.json");
const superscript = require("./fixtures/multiple-superscripts.json");

export default {
  name: "Composed/Markup",
  children: [
    {
      type: "decorator",
      platform: "native",
      decorator: CenteredDecorator
    },
    {
      type: "story",
      name: "Multiple paragraphs",
      component: () => <View>{renderTrees(multiParagraph, coreRenderers)}</View>
    },
    {
      type: "story",
      name: "Mixture of tags",
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
        })
    },
    {
      type: "story",
      name: "Biography",
      component: () => <Text>{renderTrees(bio, coreRenderers)}</Text>
    },
    {
      type: "story",
      name: "Ratings",
      component: () => <View>{renderTrees(ratings, coreRenderers)}</View>
    },
    {
      type: "story",
      name: "Subscript",
      component: () => <View>{renderTrees(subscript, coreRenderers)}</View>
    },
    {
      type: "story",
      name: "Superscript",
      component: () => <View>{renderTrees(superscript, coreRenderers)}</View>
    },
    {
      type: "story",
      name: "Multiple children with styling",
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
                      margin: 10,
                      color: "red",
                      fontFamily: fonts.headline
                    }}
                  >
                    {children}
                  </Text>
                )
              };
            }
          })}
        </View>
      )
    }
  ]
};
