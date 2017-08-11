import React from "react";
import { View, Text, Linking } from "react-native";
import Markup, { builder as mb } from "./markup-builder";
import propTypes from "./markup-proptype";

const styles = {
  italic: {
    fontStyle: "italic"
  },
  bold: {
    fontWeight: "bold"
  },
  anchor: {
    color: "blue"
  },
  paragraph: {
    color: "#333",
    fontFamily: "TimesDigital-Regular",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10
  },
  pullquote: {
    color: "#000",
    fontFamily: "TimesModern-Regular",
    fontSize: 25,
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 10
  },
  keyfacts: {
    color: "#333",
    fontFamily: "TimesDigital-Regular",
    fontSize: 13,
  }
};

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
  ],
  [
    "paragraph",
    {
      tag: Text,
      attrs() {
        return {
          style: styles.paragraph
        };
      }
    }
  ],
  [
    "pull-quote",
    {
      tag: Text,
      attrs() {
        return {
          style: styles.pullquote
        };
      }
    }
  ],
  [
    "key-facts",
    {
      tag: View,
      attrs({ title }) {
        return {
          style: styles.keyfacts,
          title
        };
      },
      wrapText: Text
    }
  ],
]);

const MarkupNative = ({ ast, wrapIn }) =>
  <Markup ast={ast} tagMap={tagMap} wrapIn={wrapIn} />;

MarkupNative.propTypes = propTypes;

export default MarkupNative;

export const builder = mb(tagMap);
