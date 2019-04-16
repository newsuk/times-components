import React from "react";
import { View, Text } from 'react-native'
import Context from "@times-components/context";
import { scales, themeFactory } from "@times-components/styleguide";
import { renderTree } from "@times-components/markup-forest";
import "./mock-text-measure-module";
import ArticleParagraph from "../src";
import { Markup, Layout, Text as FText } from "@times-components/text-flow";
import { flow } from "@times-components/markup";
import Responsive, { ResponsiveContext } from "@times-components/responsive";

export default (ast, section = "default") => {
  const theme = themeFactory(section, "magazinestandard");
  const rendered = renderTree(ast, {
    ...flow,
    paragraph(key, attributes, children, indx, node) {
      return {
        element: new FText.Text({
          font: "TimesDigitalW04-Regular",
          getComponent(spans) {
            return (
              <ArticleParagraph
                ast={node}
                dropCapFont={theme.dropCapFont}
                key={indx}
                uid={indx}
              >
                {spans}
              </ArticleParagraph>
            )
          },
          lineHeight: 30,
          markup: children,
          size: 18,
          width: 660
        })
      };
    }
  });
  const internals = rendered.getComponent(style => {
    return (<View>
      <Text selectable style={style}>
        {rendered.idealSpans.map(span => {
          if (span.href) {
            return span.href(span);
          }
          return (
            <Text
              selectable
            >
              {span.text}
            </Text>
          );
        })}
      </Text>
    </View>)
  })
  return (
    <Context.Provider
      value={{
        theme: {
          scale: scales.medium
        }
      }}
    >
      <Responsive>
        {internals}
      </Responsive>
    </Context.Provider>
  );
};
