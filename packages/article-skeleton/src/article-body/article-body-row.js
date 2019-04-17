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
import { colours, tabletWidth } from "@times-components/styleguide";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import { Markup, Layout, Text } from "@times-components/text-flow";
import DropCap from "@times-components/article-paragraph/src/drop-cap";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";

const styles = styleFactory();

export default ({
  content: data,
  interactiveConfig,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress,
  width,
  fontScale,
  isTablet
}) =>
  renderTree(data, {
    ...flow,
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
      const text = new Text.Text({
        font: "TimesModern-Regular",
        lineHeight: 90 * fontScale,
        markup: [new Markup.MarkupString(value)],
        size: 90 * fontScale
      });
      const capWidth = text.characters[0].getWidth() + 10;
      const height = 90;
      return {
        element: new Layout.InlineBlock({
          getComponent() {
            return (
              <Context.Consumer key={key}>
                {({
                  theme: {
                    dropCapFont,
                    sectionColour = colours.section.default,
                    scale
                  }
                }) => (
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
    image(key, { display, ratio, url, caption, credits }) {
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
                      display: "primary",
                      ratio,
                      uri: url
                    }}
                  />
                </View>
              );
            }
          })
        };
      }
      const inline = new Layout.InlineBlock({
        getComponent() {
          return (
            <View
              key={key}
              onLayout={e => {
                inline.height = e.nativeEvent.layout.height;
                inline.layoutDone = true;
              }}
            >
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
              />
            </View>
          );
        },
        height: width * 0.35 * aspectRatio,
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
      const link = new Markup.Link({
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
          font: "TimesDigitalW04-Regular",
          getComponent(spans) {
            return (
              <Context.Consumer key={key}>
                {({
                  theme: {
                    dropCapFont,
                    sectionColour = colours.section.default
                  }
                }) => (
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
          lineHeight: 30 * fontScale,
          markup: children,
          size: 18 * fontScale,
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
      const quote = new Text.Text({
        font: "TimesModern-Regular",
        lineHeight: 25 * 1.3 * fontScale,
        markup: [new Markup.MarkupString(content)],
        size: 25 * fontScale,
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
          height: height + 25 * 1.3 * fontScale,
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
