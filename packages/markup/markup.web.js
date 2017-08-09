import React from "react";
import Markup, { builder as mb } from "./markup-builder";
import propTypes from "./markup-proptype";

const styles = {
  author: {
    color: "#069",
    textDecoration: "none"
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
    "author",
    {
      tag: "a",
      attrs({ slug }) {
        return {
          style: styles.author,
          href: `/profile/${slug}`
        };
      }
    }
  ],
  [
    "div",
    {
      tag: "div",
      attrs() {}
    }
  ]
]);

const MarkupWeb = ({ ast, wrapIn }) =>
  <Markup ast={ast} tagMap={tagMap} wrapIn={wrapIn} />;

MarkupWeb.propTypes = propTypes;

export default MarkupWeb;

export const builder = mb(tagMap);
