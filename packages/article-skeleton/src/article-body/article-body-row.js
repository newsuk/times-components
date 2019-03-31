import React from "react";
import { View } from "react-native";
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
import { Markup, Layout, Text } from "@times-components/text-flow"

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
    dropCap() {
      return {
        element: new Markup.MarkupString("")
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
        return {
          element: new Layout.InlineBlock({
            width: width * 0.35,
            height: width * 0.35,
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
          href: "",
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
      children
    ) {
      return {
        element: new Layout.Block({
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
                          {children}
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
