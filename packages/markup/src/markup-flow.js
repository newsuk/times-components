import { Markup, Text } from "@times-components/text-flow";

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
    return {
      element: new Markup.Styled({
        children: renderedChildren,
        style: new Markup.TextStyle({
          size: 10
        })
      })
    };
  },
  superscript(key, attributes, renderedChildren) {
    return {
      element: new Markup.Styled({
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
