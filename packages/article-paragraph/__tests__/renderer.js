import React from "react";
import { View, Text } from "react-native";
import { ThemeProvider } from "newskit";
import Context from "@times-components/context";
import styleguide, { scales, themeFactory } from "@times-components/styleguide";
import { renderTree } from "@times-components/markup-forest";
import "./mock-text-measure-module";
import { Text as FText, MarkupFactory } from "@times-components/text-flow";
import { flow } from "@times-components/markup";
import Responsive from "@times-components/responsive";
import { Roboto } from "@times-components/test-utils";
import { newskitTheme } from "@times-components/utils";
import ArticleParagraph from "../src";

FText.FontLoader.loadFont("TimesDigitalW04", Roboto);

const { fontFactory } = styleguide({ scale: scales.medium });
const { fontFamily, fontSize, lineHeight } = fontFactory({
  font: "body",
  fontSize: "bodyMobile"
});
const boldFont = `${fontFamily}-Bold`;
const italicFont = `${fontFamily}-Italic`;
const { Bold, Italic, Link, Body } = MarkupFactory({
  boldFont,
  italicFont,
  linkFont: fontFamily
});

export default (ast, section = "default", newskit = false) => {
  const theme = themeFactory(section, "magazinestandard");
  const rendered = renderTree(ast, {
    ...flow({
      Body,
      Bold,
      fontFamily,
      Italic,
      Link
    }),
    paragraph(key, attributes, children, indx, node) {
      return {
        element: new FText.Text({
          font: fontFamily,
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
            );
          },
          lineHeight,
          markup: children,
          size: fontSize,
          width: 660
        })
      };
    }
  });
  const internals = rendered.getComponent(style => (
    <View>
      <Text selectable style={style}>
        {rendered.idealSpans.map(span => {
          if (span.href) {
            return span.href(span);
          }
          return <Text selectable>{span.text}</Text>;
        })}
      </Text>
    </View>
  ));
  return (
    <Context.Provider
      value={{
        newskit,
        theme: {
          scale: scales.medium
        }
      }}
    >
      <ThemeProvider theme={newskitTheme || {}}>
        <Responsive>{internals}</Responsive>
      </ThemeProvider>
    </Context.Provider>
  );
};
