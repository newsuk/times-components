/* eslint-disable react/no-array-index-key */
/* eslint-env browser */
import { AdComposer } from "@times-components/ad";
import { View, Text, Platform, ScrollView } from "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { renderTree, renderTrees } from "./markup";

const multiParagraph = require("./fixtures/multi-paragraph.json");
const multiParagraphWithAds = require("./fixtures/multi-paragraph-with-ads.json");
const mixture = require("./fixtures/tag-mixture.json");
const bio = require("./fixtures/bio.json");

// eslint-disable-next-line react/prop-types
const Centered = ({ children }) => (
  <View
    style={{
      flex: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {children}
  </View>
);

storiesOf("Markup", module)
  .addDecorator(story => <Centered>{story()}</Centered>)
  .add("Multiple paragraphs", () => <View>{renderTrees(multiParagraph)}</View>)
  .add("Multiple paragraphs with ads", () => {
    if (Platform.OS === "web") {
      return (
        <div>
          <a
            href={`/iframe.html${window.top.location.search}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to render the ads
          </a>
          <AdComposer section="article">
            {renderTrees(multiParagraphWithAds)}
          </AdComposer>
        </div>
      );
    }
    return <ScrollView>{renderTrees(multiParagraphWithAds)}</ScrollView>;
  })
  .add("Mixture of tags", () =>
    renderTree(mixture, {
      block(key, attributes, renderedChildren) {
        return <View key={key}>{renderedChildren}</View>;
      },
      link(key, attributes, renderedChildren) {
        return (
          <Text key={key} href={attributes.href}>
            {renderedChildren}
          </Text>
        );
      }
    })
  )
  .add("Biography", () => <Text>{renderTrees(bio)}</Text>)
  .add("Multiple children with styling", () => (
    <View>
      {renderTrees(multiParagraph, {
        paragraph(key, attributes, children) {
          return (
            <Text
              key={key}
              style={{
                margin: 10,
                color: "red",
                fontFamily: "TimesModern-Bold"
              }}
            >
              {children}
            </Text>
          );
        }
      })}
    </View>
  ));
