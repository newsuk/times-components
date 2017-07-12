import React from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import Markup from "./markup-builder";
import propTypes from "./markup-proptype";

const styles = StyleSheet.create({
  italic: {
    fontStyle: "italic"
  },
  bold: {
    fontWeight: "bold"
  },
  anchor: {
    color: "blue"
  }
});

const tagMap = new Map([
  [
    "p",
    {
      tag: Text,
      attrs() {}
    }
  ],
  [
    "a",
    {
      tag: Text,
      attrs({ href }) {
        return {
          style: styles.anchor,
          onPress() {
            Linking.openURL(href);
          }
        };
      }
    }
  ],
  [
    "b",
    {
      tag: Text,
      attrs() {
        return {
          style: styles.bold
        };
      }
    }
  ],
  [
    "i",
    {
      tag: Text,
      attrs() {
        return {
          style: styles.italic
        };
      }
    }
  ],
  [
    "span",
    {
      tag: Text,
      attrs() {}
    }
  ],
  [
    "div",
    {
      tag: View,
      attrs() {},
      wrapText: Text
    }
  ]
]);

const MarkupNative = ({ ast, wrapIn }) =>
  <Markup ast={ast} tagMap={tagMap} wrapIn={wrapIn} />;

MarkupNative.propTypes = propTypes;

export default MarkupNative;
