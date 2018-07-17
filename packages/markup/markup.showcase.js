/* eslint-disable react/no-array-index-key */
/* eslint-env browser */
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { AdComposer } from "@times-components/ad";
import { CenteredDecorator } from "@times-components/storybook";
import { fonts } from "@times-components/styleguide";
import { renderTree, renderTrees } from "./src/markup";
import multiParagraphWithPullQuote from "./fixtures/multi-paragraph-with-pullquote";

const multiParagraph = require("./fixtures/multi-paragraph.json");
const multiParagraphWithAds = require("./fixtures/multi-paragraph-with-ads.json");
const mixture = require("./fixtures/tag-mixture.json");
const bio = require("./fixtures/bio.json");
const ratings = require("./fixtures/ratings.json");

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
      component: () => <View>{renderTrees(multiParagraph)}</View>
    },
    {
      type: "story",
      name: "Multiple paragraphs with ads",
      platform: "web",
      component: () => (
        <AdComposer>
          <div>
            <a
              href={`/iframe.html${window.top.location.search}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Click to render the ads
            </a>
            {renderTrees(multiParagraphWithAds)}
          </div>
        </AdComposer>
      )
    },
    {
      type: "story",
      name: "Multiple paragraphs with ads",
      platform: "native",
      component: () => (
        <AdComposer>
          <ScrollView>{renderTrees(multiParagraphWithAds)}</ScrollView>
        </AdComposer>
      )
    },
    {
      type: "story",
      name: "Mixture of tags",
      component: () =>
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
    },
    {
      type: "story",
      name: "Biography",
      component: () => <Text>{renderTrees(bio)}</Text>
    },
    {
      type: "story",
      name: "Ratings",
      component: () => <View>{renderTrees(ratings)}</View>
    },
    {
      type: "story",
      name: "Multiple children with styling",
      component: () => (
        <View>
          {renderTrees(multiParagraph, {
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
    },
    {
      type: "story",
      name: "Multiple paragraphs with pull quote",
      component: () => (
        <View style={{ width: 320 }}>
          {renderTrees(multiParagraphWithPullQuote())}
        </View>
      )
    }
  ]
};
