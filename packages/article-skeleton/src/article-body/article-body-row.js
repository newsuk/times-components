/* eslint-disable prefer-destructuring */
import React from "react";
import { View } from "react-native";
import ArticleImage from "@times-components/article-image";
import ArticleParagraph from "@times-components/article-paragraph";
import Ad from "@times-components/ad";
import Context from "@times-components/context";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import { renderTree } from "@times-components/markup-forest";
import { flow } from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import styleguide, {
  colours,
  tabletWidth,
  fonts,
  spacing
} from "@times-components/styleguide";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import {
  Layout,
  Text,
  MarkupFactory,
  Markup
} from "@times-components/text-flow";
import DropCap from "@times-components/article-paragraph/src/drop-cap";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";
import { getDropCap, getDropCapValue } from "../dropcap-util-common";

export default ({
  content: data,
  interactiveConfig,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress,
  onImagePress,
  width,
  fontScale,
  isTablet,
  dropCapFont = "dropCap",
  scale
}) => {
  const styles = styleFactory(scale);
  const { fontFactory } = styleguide({ scale });
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
  return renderTree(data, {
    ...flow({
      Body,
      Bold,
      fontFamily,
      Italic,
      Link
    }),
    ad(key, attributes) {
      return {
        element: new Layout.Block({
          getComponent() {
            return (
              <Ad
                key={key}
                slotName="native-inline-ad"
                style={styles.ad}
                {...attributes}
              />
            );
          }
        })
      };
    },
    dropCap(key, attributes, children, indx, node) {
      let value = node;
      while (typeof value !== "string") {
        if (value.name === "text") {
          value = value.attributes.value;
        } else {
          value = value.children[0];
        }
      }
      const height = lineHeight * 3 * fontScale;

      const cap = getDropCap(children, fonts[dropCapFont], height, [
        new Body(value)
      ]);
      const capGap = spacing(4);
      const capWidth = (cap[0].measuredWidth + capGap) * fontScale;

      return {
        element: new Layout.InlineBlock({
          getComponent() {
            return (
              <Context.Consumer key={key}>
                {({ theme: { sectionColour = colours.section.default } }) => (
                  <DropCap
                    colour={sectionColour}
                    dropCap={getDropCapValue(cap)}
                    font={dropCapFont}
                    scale={scale}
                  />
                )}
              </Context.Consumer>
            );
          },
          height,
          width: capWidth
        })
      };
    },
    image(
      key,
      {
        display,
        ratio,
        url,
        caption,
        credits,
        relativeWidth,
        relativeHeight,
        relativeHorizontalOffset,
        relativeVerticalOffset
      }
    ) {
      const [ratioWidth, ratioHeight] = ratio.split(":");
      const aspectRatio = ratioHeight / ratioWidth;
      if (display !== "inline" || !isTablet) {
        return {
          element: new Layout.Block({
            getComponent() {
              return (
                <View key={key}>
                  <ArticleImage
                    captionOptions={{
                      caption,
                      credits
                    }}
                    imageOptions={{
                      display: display === "inline" ? "secondary" : display,
                      ratio,
                      uri: url,
                      relativeWidth,
                      relativeHeight,
                      relativeHorizontalOffset,
                      relativeVerticalOffset
                    }}
                    onImagePress={onImagePress}
                  />
                </View>
              );
            }
          })
        };
      }
      const {
        fontFamily: cFontFamily,
        fontSize: cFontSize,
        lineHeight: cLineHeight
      } = fontFactory({
        font: "supporting",
        fontSize: "caption"
      });
      let height = 0;
      if (caption) {
        const captionText = new Text.Text({
          font: cFontFamily,
          lineHeight: cLineHeight * fontScale,
          markup: [new Body(caption)],
          size: cFontSize * fontScale,
          width: width * 0.35
        });
        height += captionText.measuredHeight;
      }
      if (credits && credits[0] !== "<") {
        const creditsText = new Text.Text({
          font: cFontFamily,
          lineHeight: cLineHeight * fontScale,
          markup: [new Body(credits)],
          size: cFontSize * fontScale,
          width: width * 0.35
        });
        height += creditsText.measuredHeight;
      }
      const inline = new Layout.InlineBlock({
        getComponent() {
          return (
            <View key={key}>
              <ArticleImage
                captionOptions={{
                  caption,
                  credits
                }}
                imageOptions={{
                  display,
                  ratio,
                  uri: url
                }}
                onImagePress={onImagePress}
              />
            </View>
          );
        },
        height: width * 0.35 * aspectRatio + height,
        layoutDone: false,
        prevHeight: 0,
        width: width * 0.35
      });
      return {
        element: inline
      };
    },
    interactive(key, { id }) {
      return {
        element: new Layout.Block({
          getComponent() {
            return (
              <View
                key={key}
                style={[
                  styles.interactiveContainer,
                  isTablet && styles.interactiveContainerTablet
                ]}
              >
                <InteractiveWrapper config={interactiveConfig} id={id} />
              </View>
            );
          }
        })
      };
    },
    keyFacts(key, attributes, renderedChildren, indx, node) {
      return {
        element: new Layout.Block({
          getComponent() {
            return (
              <View style={isTablet && styles.containerTablet}>
                <KeyFacts ast={node} key={key} onLinkPress={onLinkPress} />
              </View>
            );
          }
        })
      };
    },
    link(key, attributes, children) {
      const { canonicalId, href: url, type } = attributes;
      const link = new Link({
        children,
        href(span) {
          return (
            <ArticleLink
              key={key}
              linkType={attributes.type}
              onPress={e => onLinkPress(e, { canonicalId, type, url })}
              url={url}
            >
              {span.text}
            </ArticleLink>
          );
        }
      });
      return {
        element: link
      };
    },
    paragraph(key, attributes, children, indx, node) {
      return {
        element: new Text.Text({
          font: fontFamily,
          getComponent(spans) {
            return (
              <Context.Consumer key={key}>
                {({ theme: { sectionColour = colours.section.default } }) => (
                  <ArticleParagraph
                    ast={node}
                    dropCapColour={sectionColour}
                    dropCapFont={dropCapFont}
                  >
                    {spans}
                  </ArticleParagraph>
                )}
              </Context.Consumer>
            );
          },
          lineHeight: lineHeight * fontScale,
          markup: children,
          size: fontSize * fontScale,
          width: Math.min(screenWidth(), tabletWidth)
        })
      };
    },
    pullQuote(
      key,
      {
        caption: { name, text, twitter }
      },
      children,
      indx,
      node
    ) {
      const content = node.children[0].attributes.value;
      if (!isTablet) {
        return {
          element: new Layout.Block({
            getComponent() {
              return (
                <Context.Consumer key={key}>
                  {({
                    theme: {
                      pullQuoteFont,
                      sectionColour = colours.section.default
                    }
                  }) => (
                    <View style={isTablet && styles.containerTablet}>
                      <PullQuote
                        caption={name}
                        font={pullQuoteFont}
                        onTwitterLinkPress={onTwitterLinkPress}
                        quoteColour={sectionColour}
                        text={text}
                        twitter={twitter}
                      >
                        {content}
                      </PullQuote>
                    </View>
                  )}
                </Context.Consumer>
              );
            }
          })
        };
      }
      const {
        fontFamily: qFontFamily,
        fontSize: qFontSize,
        lineHeight: qLineHeight
      } = fontFactory({
        font: "headlineRegular",
        fontSize: "pageComponentHeadline"
      });
      const quote = new Text.Text({
        font: qFontFamily,
        lineHeight: qLineHeight * fontScale,
        markup: [
          new Body('"'),
          new Markup.Newline(),
          new Body(content),
          new Markup.Newline()
        ],
        size: qFontSize * fontScale,
        width: width * 0.35
      });
      const {
        fontFamily: cFontFamily,
        fontSize: cFontSize,
        lineHeight: cLineHeight
      } = fontFactory({
        font: "supporting",
        fontSize: "caption"
      });
      let captionHeight = 0;
      if (name) {
        const caption = new Text.Text({
          font: cFontFamily,
          lineHeight: cLineHeight * fontScale,
          markup: [new Markup.Newline(), new Body(name), new Markup.Newline()],
          size: cFontSize * fontScale,
          width: width * 0.35
        });
        captionHeight = caption.measuredHeight;
      }
      const height = quote.measuredHeight + (captionHeight + spacing(1));
      return {
        element: new Layout.InlineBlock({
          getComponent() {
            return (
              <Context.Consumer key={key}>
                {({
                  theme: {
                    pullQuoteFont,
                    sectionColour = colours.section.default
                  }
                }) => (
                  <View style={isTablet && styles.containerTablet}>
                    <PullQuote
                      caption={name}
                      font={pullQuoteFont}
                      onTwitterLinkPress={onTwitterLinkPress}
                      quoteColour={sectionColour}
                      text={text}
                      twitter={twitter}
                    >
                      {content}
                    </PullQuote>
                  </View>
                )}
              </Context.Consumer>
            );
          },
          height,
          width: width * 0.35
        }),
        shouldRenderChildren: false
      };
    },
    video(
      key,
      {
        brightcovePolicyKey,
        brightcoveVideoId,
        brightcoveAccountId,
        posterImageUrl,
        caption,
        skySports
      }
    ) {
      return {
        element: new Layout.Block({
          getComponent() {
            const aspectRatio = 16 / 9;
            const screenW = screenWidth(isTablet);
            const height = width / aspectRatio;
            return (
              <View
                key={key}
                style={[
                  styles.primaryContainer,
                  isTablet && styles.containerTablet
                ]}
              >
                <Video
                  accountId={brightcoveAccountId}
                  height={height}
                  onVideoPress={onVideoPress}
                  policyKey={brightcovePolicyKey}
                  poster={{ uri: posterImageUrl }}
                  skySports={skySports}
                  videoId={brightcoveVideoId}
                  width={screenW}
                />
                <InsetCaption caption={caption} />
              </View>
            );
          }
        })
      };
    }
  });
};
