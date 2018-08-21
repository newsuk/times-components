import React from "react";
import ReactDOMServer from "react-dom/server";
import css from "css";
import isEqual from "lodash.isequal";
import traverse from "./traverse";
import { stylePrinter } from "./printers";

const cleanClassNames = names => {
  const className = (names || "")
    .replace(/rn-[^-^ ]+-[^-^ ]+/g, "")
    .replace(/[ ]+/g, " ")
    .trim();

  return className.length ? { className } : {};
};

const mergeStyles = (style, { property, value }) => ({
  ...style,
  [property]: value
});

const mergeStylesToClassNames = (classMap, node) => {
  if (node.type !== "rule") {
    return classMap;
  }

  const className = node.selectors[0].slice(1);

  return {
    ...classMap,
    [className]: node.declarations.reduce(mergeStyles, {})
  };
};

const getStyleSheet = AppRegistry => {
  AppRegistry.registerComponent("App", () => () => {});
  const { getStyleElement } = AppRegistry.getApplication("App");
  const ssString = ReactDOMServer.renderToStaticMarkup(getStyleElement());

  const [, match] = ssString.match(/<style.*>(.*)<\/style>/s);

  if (!match) {
    return {};
  }

  const ast = css.parse(match);

  if (ast.stylesheet.parsingErrors.length > 0) {
    return {};
  }

  return ast.stylesheet.rules.reduce(mergeStylesToClassNames, {});
};

const classNamesToStyles = (AppRegistry, className) => {
  if (!className) {
    return {};
  }

  const ss = getStyleSheet(AppRegistry);

  return className.split(" ").reduce((m, c) => ({ ...m, [c]: ss[c] }), {});
};

const filterNames = (className, toInclude) => {
  if (!className) {
    return [];
  }

  return className.split(" ").filter(c => {
    const [, prop] = c.split("-");

    return toInclude.has(prop);
  });
};

const findStyle = (rnwStyles = {}, style) => {
  const kv = Object.entries(rnwStyles);

  for (let i = 0; i < kv.length; i++) {
    const [key, value] = kv[i];

    if (isEqual(value, style)) {
      return key;
    }
  }

  return null;
};

const updateMap = (cssStyles, styleMap, classNames) => {
  if (classNames.length === 0) {
    return {
      key: null,
      styleMap
    };
  }

  const mergedStyle = classNames.reduce((m, c) => {
    if (cssStyles[c]) {
      return {
        ...m,
        ...cssStyles[c]
      };
    }

    return m;
  }, {});

  const existingStyle = findStyle(styleMap.rnw, mergedStyle);

  if (existingStyle) {
    return {
      key: existingStyle,
      styleMap
    };
  }

  const key = `S${Object.keys(styleMap.rnw || {}).length + 1}`;

  return {
    key,
    styleMap: {
      ...styleMap,
      rnw: {
        ...styleMap.rnw,
        [key]: mergedStyle
      }
    }
  };
};

export const rnwTransform = (AppRegistry, includeStyleProps) => (
  accum,
  node,
  props,
  children
) => {
  const { className, ...other } = props;

  const cssStyles = classNamesToStyles(AppRegistry, className);

  const filteredNames = filterNames(className, new Set(includeStyleProps));
  const updatedMap = updateMap(cssStyles, accum, filteredNames);

  const newProps = {
    ...other,
    ...cleanClassNames(className)
  };

  if (updatedMap.key) {
    newProps.className = newProps.className
      ? `${newProps.className} ${updatedMap.key}`
      : updatedMap.key;
  }

  return {
    accum: updatedMap.styleMap,
    node,
    props: newProps,
    children
  };
};

export default (AppRegistry, includeStyleProps) =>
  traverse(stylePrinter, rnwTransform(AppRegistry, includeStyleProps));
