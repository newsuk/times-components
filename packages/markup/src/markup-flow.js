import { Markup, Text } from "@times-components/text-flow";
import { subscriptMap, superscriptMap } from "./sub-sup";

export default {
  block(key, attributes, renderedChildren) {
    return {
      element: new Markup.Styled({
        children: renderedChildren
      })
    };
  },
  bold(key, attributes, renderedChildren) {
    return {
      element: new Markup.Bold({
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
      element: new Markup.Italic({
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
      element: new Markup.Italic({
        children: renderedChildren
      })
    };
  },
  paragraph(key, attributes, renderedChildren) {
    return {
      element: new Text.Text({
        font: "TimesDigitalW04-Regular",
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
      element: new Markup.Bold({
        children: renderedChildren
      })
    };
  },
  subscript(key, attributes, renderedChildren) {
    const chars = renderedChildren.toString().split("");

    if (chars.every(char => char in subscriptMap)) {
      return {
        element: new Markup.MarkupString(
          chars.map(char => subscriptMap[char].join(""))
        )
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
        element: new Markup.MarkupString(
          chars.map(char => superscriptMap[char]).join("")
        )
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
      element: new Markup.MarkupString(value)
    };
  }
};
