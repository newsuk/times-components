import { Markup, Text } from "@times-components/text-flow";
import { subscriptMap, superscriptMap } from "./sub-sup";

export default ({ fontFamily, Bold, Italic, Body }) => ({
  block(key, attributes, renderedChildren) {
    return {
      element: new Markup.Styled({
        children: renderedChildren
      })
    };
  },
  bold(key, attributes, renderedChildren) {
    return {
      element: new Bold({
        children: renderedChildren
      })
    };
  },
  break() {
    return {
      element: new Markup.Newline()
    };
  },
  emphasis(key, attributes, renderedChildren) {
    return {
      element: new Italic({
        children: renderedChildren
      })
    };
  },
  inline(key, attributes, renderedChildren) {
    return {
      element: new Markup.Styled({
        children: renderedChildren
      })
    };
  },
  italic(key, attributes, renderedChildren) {
    return {
      element: new Italic({
        children: renderedChildren
      })
    };
  },
  paragraph(key, attributes, renderedChildren) {
    return {
      element: new Text.Text({
        font: fontFamily,
        height: 200,
        lineHeight: 30,
        markup: renderedChildren,
        size: 18,
        width: 600
      })
    };
  },
  strong(key, attributes, renderedChildren) {
    return {
      element: new Bold({
        children: renderedChildren
      })
    };
  },
  subscript(key, attributes, renderedChildren) {
    const chars = renderedChildren.toString().split("");

    if (chars.every(char => char in subscriptMap)) {
      return {
        element: new Body(chars.map(char => subscriptMap[char].join("")))
      };
    }
    return {
      element: new Markup.StyledText({
        children: renderedChildren,
        style: new Markup.TextStyle({
          size: 10
        })
      })
    };
  },
  superscript(key, attributes, renderedChildren) {
    const chars = renderedChildren.toString().split("");

    if (chars.every(char => char in superscriptMap)) {
      return {
        element: new Body(chars.map(char => superscriptMap[char]).join(""))
      };
    }
    return {
      element: new Markup.StyledText({
        children: renderedChildren,
        style: new Markup.TextStyle({
          size: 10
        })
      })
    };
  },
  text(key, { value }) {
    return {
      element: new Body(value)
    };
  }
});
