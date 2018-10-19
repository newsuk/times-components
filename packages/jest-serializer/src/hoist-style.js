import traverse from "./traverse";
import { stylePrinter } from "./printers";

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

  return {
    accum: {
      ...accum,
      inlineStyles: {
        ...accum.inlineStyles,
        [inlineStyleClass]: style
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
