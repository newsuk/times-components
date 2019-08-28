/* eslint-disable no-param-reassign */
/* eslint-env jest, node */
import nativeStyled from "styled-components/native";
import webStyled from "styled-components";
import { StyleSheet, View } from "react-native";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compile";

import { ID_ATTR, INTERNALS, SERIALIZER_MARKER } from "./shared";

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

expect.addSnapshotSerializer({
  test(val) {
    return val && !val[SERIALIZER_MARKER] && val.$$typeof === Symbol.for("react.test.json");
  },
  print(val, print) {
    const blocks = [];
    let idx = 0;

    walkNodes(val, node => {
      node[SERIALIZER_MARKER] = true;
      node.props = node.props || {};

      const hash = node.props[ID_ATTR];
      const info = INTERNALS.serializer[hash];

      delete node.props[ID_ATTR];

      if (hash && info) {
        const selector = `.nc${idx}`;
        const css = getRules(node, info.css);
        const mediaQueries = info.mediaQueries.map(({ args, styles }) => {
          const rules = getRules(node, styles);

          return `@media (${args}) {
  ${selector} {
    ${rules.join("\n    ")}
  }
}`;
        });

        if (css.length) {
          blocks.push(`${selector} {
  ${css.join("\n  ")}
}`);
        }

        if (mediaQueries.length) {
          blocks.push(...mediaQueries);
        }

        idx += 1;
      }
    });

    const result = print(val);

    return blocks.length ? `${[...blocks, result].join("\n\n")}` : result;
  }
});
