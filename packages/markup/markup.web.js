import React from "react";
import Markup, { builder as mb } from "./markup-builder";
import propTypes from "./markup-proptype";

const styles = {
  paragraph: {
    color: "#333",
    fontFamily: "TimesDigital-Regular"
  },
  pullquote: {
    color: "#000",
    fontFamily: "TimesModern-Regular",
    fontSize: 25,
    lineHeight: 1.2
  }
};

const tagMap = new Map([
  [
    "p",
    {
      tag: "p",
      attrs() {}
    }
  ],
  [
    "a",
    {
      tag: "a",
      attrs({ href }) {
        return {
          href
        };
      }
    }
  ],
  [
    "b",
    {
      tag: "strong",
      attrs() {}
    }
  ],
  [
    "i",
    {
      tag: "em",
      attrs() {}
    }
  ],
  [
    "span",
    {
      tag: "span",
      attrs() {}
    }
  ],
  [
    "div",
    {
      tag: "div",
      attrs() {}
    }
  ],
  [
    "paragraph",
    {
      tag: "p",
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
      tag: "p",
      attrs() {
        return {
          style: styles.pullquote
        };
      }
    }
  ]
]);

const MarkupWeb = ({ ast, wrapIn }) =>
  <Markup ast={ast} tagMap={tagMap} wrapIn={wrapIn} />;

MarkupWeb.propTypes = propTypes;

export default MarkupWeb;

export const builder = mb(tagMap);
