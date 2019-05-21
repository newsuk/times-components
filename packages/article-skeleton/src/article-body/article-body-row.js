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
  fonts
} from "@times-components/styleguide";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import { Layout, Text, MarkupFactory } from "@times-components/text-flow";
import DropCap from "@times-components/article-paragraph/src/drop-cap";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";

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
    dropCap(key, { value }) {
      const height = lineHeight * 3 * fontScale;
      const text = new Text.Text({
        font: fonts[dropCapFont],
        lineHeight: height,
        markup: [new Body(value)],
        size: height
      });
      const capWidth = text.characters[0].getWidth() + 10 * fontScale;
      return {
        element: new Layout.InlineBlock({
          getComponent() {
            return (
              <Context.Consumer key={key}>
                {({ theme: { sectionColour = colours.section.default } }) => (
                  <DropCap
                    colour={sectionColour}
                    dropCap={value}
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
      const captionText = new Text.Text({
        font: cFontFamily,
        lineHeight: cLineHeight * fontScale,
        markup: [new Body(caption)],
        size: cFontSize * fontScale,
        width: width * 0.35
      });
      const captionHeight = captionText.measuredHeight;
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
        height: width * 0.35 * aspectRatio + captionHeight,
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
          width: Math.min(screenWidth(), tabletWidth) - 10
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
        markup: [new Body(content)],
        size: qFontSize * fontScale,
        width: width * 0.35
      });
      const height = quote.measuredHeight;
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
          height: height + lineHeight * 1.3 * fontScale,
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
