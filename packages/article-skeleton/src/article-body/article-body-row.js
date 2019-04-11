import React from "react";
import { View, Dimensions } from "react-native";
import ArticleImage from "@times-components/article-image";
import ArticleParagraph from "@times-components/article-paragraph";
import Ad from "@times-components/ad";
import Context from "@times-components/context";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import { renderTree } from "@times-components/markup-forest";
import { flow } from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import { ResponsiveContext } from "@times-components/responsive";
import { colours } from "@times-components/styleguide";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import { Markup, Layout, Text } from "@times-components/text-flow"
import DropCap from "@times-components/article-paragraph/src/drop-cap";
import { tabletWidth } from "@times-components/styleguide";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";


const styles = styleFactory();

export const ArticleRowFlow = ({
  content: data,
  interactiveConfig,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress,
  width,
  fontScale
}) =>
  renderTree(data, {
    ...flow,
    dropCap(key, { value }, children, indx, node) {
      const text = new Text.Text({
        font: 'TimesModern-Regular',
        size: 90 * fontScale,
        lineHeight: 90 * fontScale,
        markup: [new Markup.MarkupString(value)]
      });
      const width = text.characters[0].getWidth() + 10
      const height = 90
      return {
        element: new Layout.InlineBlock({
          getComponent() {
            return (<Context.Consumer key={key}>
              {({
                theme: { dropCapFont, sectionColour = colours.section.default, scale }
              }) => (
                  <DropCap
                    colour={sectionColour}
                    dropCap={value}
                    font={dropCapFont}
                    scale={scale} />
                )}
            </Context.Consumer>)
          },
          width,
          height
        })
      }
    },
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
            )
          }
        })
      }
    },
    image(key, { display, ratio, url, caption, credits }, children, indx, node) {
      if (display !== 'inline') {
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
                      display,
                      ratio,
                      uri: url
                    }}
                  />
                </View>
              )
            }
          })
        }
      } 
        const [ratioWidth, ratioHeight] = ratio.split(":");
        const aspectRatio = ratioHeight / ratioWidth;
        return {
          element: new Layout.InlineBlock({
            width: width * 0.35,
            height: (width * 0.35) * aspectRatio,
            layoutDone: false,
            prevHeight: 0,
            getComponent() {
              return (
                <View key={key} onLayout={e => {
                  this.height = e.nativeEvent.layout.height
                  this.layoutDone = true
                }}>
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
              )
            }
          })
        }
      
    },
    interactive(key, { id }) {
      return {
        element: new Layout.Block({
          getComponent() {
            return (
              <ResponsiveContext.Consumer>
                {({ isTablet }) => (
                  <View
                    key={key}
                    style={[
                      styles.interactiveContainer,
                      isTablet && styles.interactiveContainerTablet
                    ]}
                  >
                    <InteractiveWrapper config={interactiveConfig} id={id} />
                  </View>
                )}
              </ResponsiveContext.Consumer>
            )
          }
        })
      }
    },
    keyFacts(key, attributes, renderedChildren, indx, node) {
      return {
        element: new Layout.Block({
          getComponent() {
            return (
              <ResponsiveContext.Consumer>
                {({ isTablet }) => (
                  <View style={isTablet && styles.containerTablet}>
                    <KeyFacts ast={node} key={key} onLinkPress={onLinkPress} />
                  </View>
                )}
              </ResponsiveContext.Consumer>
            )
          }
        })
      }
    },
    link(key, attributes, children) {
      const { canonicalId, href: url, type } = attributes;

      return {
        element: new Markup.Link({
          children,
          href() {
            return (<ArticleLink
              key={key}
              linkType={attributes.type}
              onPress={e => onLinkPress(e, { canonicalId, type, url })}
              url={url}
            >
              {this.text}
            </ArticleLink>)
          }
        })
      }
    },
    paragraph(key, attributes, children, indx, node) {
      return {
        element: new Text.Text({
          getComponent(children) {
            return (<Context.Consumer key={key}>
              {({
                theme: { dropCapFont, sectionColour = colours.section.default }
              }) => (
                  <ArticleParagraph
                    ast={node}
                    dropCapColour={sectionColour}
                    dropCapFont={dropCapFont}
                  >
                    {children}
                  </ArticleParagraph>
                )}
            </Context.Consumer>)
          },
          markup: children,
          font: 'TimesDigitalW04-Regular',
          size: 18 * fontScale,
          lineHeight: 30 * fontScale,
          width: Math.min(screenWidth(), tabletWidth) - 10
        })
      }
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
      // TODO: measureText function?
      const quote = new Text.Text({
        font: 'TimesModern-Regular',
        size: 25 * fontScale,
        lineHeight: (25 * 1.3) * fontScale,
        width: width * 0.35,
        markup: [new Markup.MarkupString(content)]
      });
      const height = quote.measuredHeight
      return {
        shouldRenderChildren: false,
        element: new Layout.InlineBlock({
          width: width * 0.35,
          height: height + ((25 * 1.3) * fontScale),
          getComponent() {
            return (<Context.Consumer key={key}>
              {({
                theme: { pullQuoteFont, sectionColour = colours.section.default }
              }) => (
                  <ResponsiveContext.Consumer>
                    {({ isTablet }) => (
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
                  </ResponsiveContext.Consumer>
                )}
            </Context.Consumer>)
          }
        })
      }
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
            return (
              <ResponsiveContext.Consumer>
                {({ isTablet }) => {
                  const aspectRatio = 16 / 9;
                  const width = screenWidth(isTablet);
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
                        width={width}
                      />
                      <InsetCaption caption={caption} />
                    </View>
                  );
                }}
              </ResponsiveContext.Consumer>
            )
          }
        })
      }
    }
  });
