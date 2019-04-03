import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import ArticleImage from "@times-components/article-image";
import ArticleParagraph from "@times-components/article-paragraph";
import Ad from "@times-components/ad";
import Context from "@times-components/context";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers, { flow } from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import { ResponsiveContext } from "@times-components/responsive";
import { colours } from "@times-components/styleguide";
import { screenWidth } from "@times-components/utils";
import Video from "@times-components/video";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";
import { Markup, Layout, Text as FlowText } from "@times-components/text-flow"
import DropCap from "@times-components/article-paragraph/src/drop-cap";

const styles = styleFactory();

const ArticleRow = ({
  content: { data, index },
  interactiveConfig,
  onImagePress,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress
}) =>
  renderTree(data, {
    ...coreRenderers,
    ad(key, attributes) {
      return {
        element: (
          <Ad
            key={key}
            slotName="native-inline-ad"
            style={styles.ad}
            {...attributes}
          />
        )
      };
    },
    image(key, { display, ratio, url, imageIndex, caption, credits }) {
      return {
        element: (
          <View key={key}>
            <ArticleImage
              captionOptions={{
                caption,
                credits
              }}
              imageOptions={{
                display,
                index: imageIndex,
                ratio,
                uri: url
              }}
              onImagePress={onImagePress}
            />
          </View>
        )
      };
    },
    interactive(key, { id }) {
      return {
        element: (
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
      };
    },
    keyFacts(key, attributes, renderedChildren, indx, node) {
      return {
        element: (
          <ResponsiveContext.Consumer>
            {({ isTablet }) => (
              <View style={isTablet && styles.containerTablet}>
                <KeyFacts ast={node} key={key} onLinkPress={onLinkPress} />
              </View>
            )}
          </ResponsiveContext.Consumer>
        ),
        shouldRenderChildren: false
      };
    },
    link(key, attributes, children) {
      const { canonicalId, href: url, type } = attributes;

      return {
        element: (
          <ArticleLink
            key={key}
            linkType={attributes.type}
            onPress={e => onLinkPress(e, { canonicalId, type, url })}
            url={url}
            uuid={index}
          >
            {children}
          </ArticleLink>
        )
      };
    },
    paragraph(key, attributes, children, indx, node) {
      return {
        element: (
          <Context.Consumer key={key}>
            {({
              theme: { dropCapFont, sectionColour = colours.section.default }
            }) => (
                <ArticleParagraph
                  ast={node}
                  dropCapColour={sectionColour}
                  dropCapFont={dropCapFont}
                  uid={index}
                >
                  {children}
                </ArticleParagraph>
              )}
          </Context.Consumer>
        )
      };
    },
    pullQuote(
      key,
      {
        caption: { name, text, twitter }
      },
      children
    ) {
      return {
        element: (
          <Context.Consumer key={key}>
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
                        {children}
                      </PullQuote>
                    </View>
                  )}
                </ResponsiveContext.Consumer>
              )}
          </Context.Consumer>
        )
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
        element: (
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
      };
    }
  });

ArticleRow.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    }),
    index: PropTypes.number
  }).isRequired,
  interactiveConfig: PropTypes.shape({}).isRequired,
  onImagePress: PropTypes.func,
  onLinkPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};

ArticleRow.defaultProps = {
  onImagePress: null
};

export default ArticleRow;

export const ArticleRowFlow = ({
  content: data,
  interactiveConfig,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress,
  width
}) =>
  renderTree(data, {
    ...flow,
    dropCap(key, { value }, children, indx, node) {
      const text = new FlowText.Text({
        font: 'TimesModern-Regular',
        size: 90,
        lineHeight: 90,
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
                    dropCap={value}
                    font={dropCapFont}
                    scale={scale}
                    colour={sectionColour}/>
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
      } else {
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
          href: url,
          getComponent() {
            return (
              <ArticleLink
                key={key}
                linkType={attributes.type}
                onPress={e => onLinkPress(e, { canonicalId, type, url })}
                url={url}
              >
                {children}
              </ArticleLink>
            )
          }
        })
      }
    },
    paragraph(key, attributes, children, indx, node) {
      return {
        element: new FlowText.Text({
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
          size: 18,
          lineHeight: 30,
          width: 660
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
      const quote = new FlowText.Text({
        font: 'TimesModern-Regular',
        size: 25,
        lineHeight: 25 * 1.3,
        width: width * 0.35,
        markup: [new Markup.MarkupString(content)]
      });
      const height = quote.measuredHeight
      return {
        shouldRenderChildren: false,
        element: new Layout.InlineBlock({
          width: width * 0.35,
          height: height + 20,
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
