import React from "react";
import { AppRegistry } from "react-native-web";
import ReactDOMServer from "react-dom/server";
import css from "css";

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

const getStyleSheet = () => {
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

const classNamesToStyles = className => {
  if (!className) {
    return {};
  }

  const ss = getStyleSheet();

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

  const key = `S${Object.keys(styleMap).length + 1}`;

  return {
    key,
    styleMap: {
      ...styleMap,
      [key]: mergedStyle
    }
  };
};

export const transformProps = includeStyleProps => (accum, node) => {
  const { className, ...other } = node.props;

  const cssStyles = classNamesToStyles(className);
  const filteredNames = filterNames(className, new Set(includeStyleProps));
  const updatedMap = updateMap(cssStyles, accum, filteredNames);

  const newProps = {
    ...other,
    ...cleanClassNames(className)
  };

  if (updatedMap.key) {
    newProps.className = updatedMap.key;
  }

  return {
    accum: updatedMap.styleMap,
    props: newProps
  };
};

export const printer = (serialize, accum, element) => {
  const styleBlock =
    Object.keys(accum).length > 0
      ? `<style>
${serialize(accum).replace(/Object\s{/g, "{")}
</style>

`
      : "";

  return `${styleBlock}${serialize(element)}`;
};
