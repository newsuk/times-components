/* eslint-disable no-param-reassign */
import React, { forwardRef } from "react";
import { MEDIA_QUERY_PROP_MAPPER_TAG } from "./shared";
import nativeStyled from "styled-components/native";
import webStyled from "styled-components";
import { StyleSheet, View } from "react-native";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compile";

const ID_ATTR = "data-responsive-styled-components-native-id";
const INTERNALS = {};

function getHash() {
  let hash;

  while (!hash || INTERNALS[hash]) {
    hash = Math.random()
      .toString(36)
      .substring(7);
  }

  return hash;
}

export function markupMediaQuery(propMapper, info) {
  const fn = process.env.RESPONSIVE_NATIVE_STYLED_COMPONENTS_NATIVE_TESTS
    ? propMapper
    : () => "";

  // eslint-disable-next-line no-param-reassign
  fn[MEDIA_QUERY_PROP_MAPPER_TAG] = info;
  return fn;
}

function groupBy(arr, condition) {
  const a = [];
  const b = [];

  arr.forEach(item => {
    (condition(item) ? a : b).push(item);
  });

  return [a, b];
}

export function markup(Component, args) {
  const hash = getHash();
  const [css, mediaQueries] = groupBy(
    args,
    arg => !arg[MEDIA_QUERY_PROP_MAPPER_TAG]
  );

  INTERNALS[hash] = {
    css,
    mediaQueries: mediaQueries.map(fn => fn[MEDIA_QUERY_PROP_MAPPER_TAG])
  };

  const NewComponent = forwardRef((props, ref) => (
    <Component {...props} ref={ref} {...{ [ID_ATTR]: hash }} />
  ));

  NewComponent.displayName =
    "ResponsiveStyledComponentsNativeSerialisationHelper";

  return NewComponent;
}

function getRules(node, styles) {
  const Styled = nativeStyled(View)`
    ${styles};
  `;

  const styleCreator = Styled.inlineStyle;
  const parsed = StyleSheet.flatten(
    styleCreator.generateStyleObject(node.props)
  );
  const converted = inline(parsed);
  const { rules } = webStyled.div(converted).componentStyle;

  return rules;
}

// @todo Look into inlining this
function getSerialisationInfo(node) {
  if (
    process.env.NODE_ENV !== "test" ||
    !node ||
    !node.props ||
    !node.props[ID_ATTR]
  ) {
    return null;
  }

  const hash = node.props[ID_ATTR];
  const info = INTERNALS[hash];

  if (!info) {
    return null;
  }

  return {
    css: getRules(node, info.css),
    mediaQueries: info.mediaQueries.map(({ args, styles }) => ({
      args,
      rules: getRules(node, styles)
    }))
  };
}

const KEY = "responsive-styled-components-native";

function walkNodes(val, onNode) {
  if (typeof val !== "object") {
    return val;
  }

  onNode(val);

  if (val.children) {
    Array.from(val.children).forEach(child => walkNodes(child, onNode));
  }

  return val;
}

export const serializer = {
  test(val) {
    return val && !val[KEY] && val.$$typeof === Symbol.for("react.test.json");
  },
  print(val, print) {
    const collectedQueries = [];

    walkNodes(val, node => {
      node[KEY] = true;

      const info = getSerialisationInfo(node);

      if (info) {
        collectedQueries.push({ node, ...info });
      }

      if (node.props && node.props[ID_ATTR]) {
        delete node.props[ID_ATTR];
      }
    });

    const result = print(val);

    if (!collectedQueries.length) {
      return result;
    }

    return `${collectedQueries
      .map(({ css, mediaQueries }, idx) => {
        const pieces = [];
        const selector = `.nc${idx}`;

        if (css.length) {
          pieces.push(`${selector} {
  ${css.join("\n  ")}
}`);
        }

        if (mediaQueries.length) {
          pieces.push(
            ...mediaQueries.map(
              mediaQuery => `@media (${mediaQuery.args}) {
  ${selector} {
    ${mediaQuery.rules.join("\n    ")}
  }
}`
            )
          );
        }

        return pieces.join("\n\n");
      })
      .join("\n\n")}

${result}`;
  }
};
