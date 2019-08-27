/* eslint-disable no-param-reassign */
import React, { forwardRef } from "react";
import { MEDIA_QUERY_PROP_MAPPER_TAG } from "./shared";
import nativeStyled from "styled-components/native";
import webStyled from "styled-components";
import { StyleSheet, View } from "react-native";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compile";

const ID_ATTR = "data-responsive-styled-components-native-id";

export function markupMediaQuery(propMapper, info) {
  const fn = process.env.RESPONSIVE_NATIVE_STYLED_COMPONENTS_NATIVE_TESTS
    ? propMapper
    : () => "";

  // eslint-disable-next-line no-param-reassign
  fn[MEDIA_QUERY_PROP_MAPPER_TAG] = info;
  return fn;
}

export function markup(Component, args) {
  const mediaQueries = args.filter(arg => !!arg[MEDIA_QUERY_PROP_MAPPER_TAG]);

  const NewComponent = forwardRef((props, ref) => (
    <Component {...props} ref={ref} {...{ [ID_ATTR]: mediaQueries }} />
  ));

  NewComponent.displayName =
    "ResponsiveStyledComponentsNativeSerialisationHelper";

  return NewComponent;
}

export function getMediaQueries(node) {
  if (
    process.env.NODE_ENV !== "test" ||
    !node ||
    !node.props ||
    !node.props[ID_ATTR]
  ) {
    return [];
  }

  const queries = node.props[ID_ATTR];

  if (!queries) {
    return [];
  }

  return queries.map(query => {
    const info = query[MEDIA_QUERY_PROP_MAPPER_TAG];
    const Styled = nativeStyled(View)`
      ${info.styles};
    `;

    const styleCreator = Styled.inlineStyle;
    const parsed = StyleSheet.flatten(
      styleCreator.generateStyleObject(node.props)
    );
    const converted = inline(parsed);
    const { rules } = webStyled.div(converted).componentStyle;

    return {
      args: info.args,
      rules
    };
  });
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

      const mediaQueries = getMediaQueries(node);

      if (mediaQueries.length) {
        collectedQueries.push(mediaQueries);
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
      .map((mediaQueries, idx) =>
        mediaQueries
          .map(
            mediaQuery => `@media (${mediaQuery.args}) {
  .m${idx} {
    ${mediaQuery.rules.join("\n    ")}
  }
}`
          )
          .join("\n\n")
      )
      .join("\n\n")}

${result}`;
  }
};
