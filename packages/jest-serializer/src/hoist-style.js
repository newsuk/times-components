import hyphenateStyleName from "hyphenate-style-name";
import normalizeValue from "react-native-web/dist/cjs/exports/StyleSheet/normalizeValue";
import createReactDOMStyle from "react-native-web/dist/cjs/exports/StyleSheet/createReactDOMStyle";
import prefixStyles from "react-native-web/dist/cjs/modules/prefixStyles";

import traverse from "./traverse";
import { stylePrinter } from "./printers";

const transformRNStyleProperty = (acc, [propertyName, value]) => ({
  ...acc,
  [hyphenateStyleName(propertyName)]: normalizeValue(propertyName, value)
});

const transformRNStylesForWeb = style =>
  Object.entries(createReactDOMStyle(prefixStyles({ ...style }))).reduce(
    transformRNStyleProperty,
    {}
  );

export const hoistStyleTransform = (accum, node, props, children) => {
  const { style, className, ...other } = props;

  if (!style) {
    return {
      accum,
      children,
      node,
      props
    };
  }

  if (Object.keys(style).length === 0) {
    const omittedStyle = {
      ...other
    };

    if (className) {
      omittedStyle.className = className;
    }

    return {
      accum,
      children,
      node,
      props: omittedStyle
    };
  }

  const inlineStyleClass = `IS${Object.keys(accum.inlineStyles || {}).length +
    1}`;
  const newClassName = className
    ? `${className} ${inlineStyleClass}`
    : inlineStyleClass;

  const transformedStyle = transformRNStylesForWeb(style);

  return {
    accum: {
      ...accum,
      inlineStyles: {
        ...accum.inlineStyles,
        [inlineStyleClass]: transformedStyle
      }
    },
    children,
    node,
    props: {
      className: newClassName,
      ...other
    }
  };
};

export default traverse(stylePrinter, hoistStyleTransform);
