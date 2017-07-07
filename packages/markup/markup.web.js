import React from "react";
import Markup from "./markup-builder";
import propTypes from "./markup-proptype";

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
  ]
]);

const MarkupWeb = ({ ast, wrapIn }) =>
  <Markup ast={ast} tagMap={tagMap} wrapIn={wrapIn} />;

MarkupWeb.propTypes = propTypes;

export default MarkupWeb;
