import React from "react";
import Link from "@times-components/link";
import Markup, { builder as mb } from "./markup-builder";
import propTypes from "./markup-proptype";

const tagMap = new Map([
  [
    "paragraph",
    {
      tag: "p",
      attrs() {}
    }
  ],
  [
    "link",
    {
      tag: Link,
      attrs({ href }) {
        return {
          url: href
        };
      }
    }
  ],
  [
    "bold",
    {
      tag: "strong",
      attrs() {}
    }
  ],
  [
    "italic",
    {
      tag: "em",
      attrs() {}
    }
  ],
  [
    "inline",
    {
      tag: "span",
      attrs() {}
    }
  ],
  [
    "author",
    {
      tag: Link,
      attrs({ slug }) {
        return {
          url: `/profile/${slug}`
        };
      }
    }
  ],
  [
    "block",
    {
      tag: "div",
      attrs() {}
    }
  ]
]);

const MarkupWeb = ({ ast, wrapIn }) => (
  <Markup ast={ast} tagMap={tagMap} wrapIn={wrapIn} />
);

MarkupWeb.propTypes = propTypes;

export default MarkupWeb;

export const builder = mb(tagMap);
