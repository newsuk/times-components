import React from "react";
import PropTypes from "prop-types";
import propTypes from "./markup-proptype";

const bump = value => {
  const levels = value.split(".");
  const current = parseInt(levels[levels.length - 1], 10);

  return levels
    .slice(0, levels.length - 1)
    .concat(current + 1)
    .join(".");
};

const descend = value => `${value}.1`;

function astToMarkup(tagMap, key, wrapTextWith, [x, ...xs]) {
  if (!x) {
    return [];
  }

  if (x.name === "text") {
    const t = x.children[0].text;
    const element = wrapTextWith
      ? React.createElement(wrapTextWith, { key }, t)
      : t;
    return [element, ...astToMarkup(tagMap, bump(key), wrapTextWith, xs)];
  }

  const children = [];

  const { tag, attrs, wrapText } = tagMap.get(x.name) || {};

  if (tag) {
    children.push(
      React.createElement(
        tag,
        Object.assign(
          {
            key
          },
          attrs(x.attributes)
        ),
        astToMarkup(tagMap, descend(key), wrapText, x.children)
      )
    );
  }

  return children.concat(...astToMarkup(tagMap, bump(key), wrapTextWith, xs));
}

export const builder = tagMap => ({ ast, wrapIn }) =>
  astToMarkup(tagMap, "0", tagMap.get(wrapIn || "block").wrapText, ast);

export default function Markup({ ast, tagMap, wrapIn }) {
  const markup = builder(tagMap)({ ast, wrapIn });

  if (markup.length === 1) {
    return markup[0];
  }

  return React.createElement(tagMap.get(wrapIn || "block").tag, {}, markup);
}

Markup.propTypes = Object.assign({}, propTypes, {
  tagMap: PropTypes.instanceOf(Map).isRequired
});
