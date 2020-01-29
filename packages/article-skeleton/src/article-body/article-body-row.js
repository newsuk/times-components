/* eslint-disable prefer-destructuring */
import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import styleguide, { colours, tabletWidth } from "@times-components/styleguide";
import { AttributedString } from "@times-components/typeset";
import { screenWidth } from "@times-components/utils";
import Ad from "@times-components/ad";
import ArticleImage from "@times-components/article-image";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import PullQuote from "@times-components/pull-quote";
import Video from "@times-components/video";
import ArticleParagraphWrapper from "@times-components/article-paragraph";
import Context from "@times-components/context";
import ArticleParagraph from "./article-body-paragraph";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";
import ArticleLink from "./article-link";

export default ({
  data,
  interactiveConfig,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress,
  onImagePress,
  isTablet,
  adConfig,
  images = [],
  dropcapsDisabled,
  dropCapFont = "dropCap",
  scale
}) => {
  const styles = styleFactory(scale);
  const { fontFactory } = styleguide({ scale });

  const defaultFont = {
    ...fontFactory({
      font: "body",
      fontSize: "bodyMobile"
    }),
    fontStyle: "normal",
    fontWeight: "normal",
    color: colours.functional.black
  };

  const { fontScale } = Dimensions.get("window");
  defaultFont.fontSize *= fontScale;
  defaultFont.lineHeight *= fontScale;

  const fontConfig = {
    body: defaultFont,
    bold: {
      ...defaultFont,
      fontFamily: "TimesDigitalW04",
      fontWeight: "bold"
    },
    italic: {
      ...defaultFont,
      fontFamily: "TimesDigitalW04",
      fontStyle: "italic"
    },
    link: defaultFont,
    subheading: {
      ...defaultFont,
      ...fontFactory({
        font: "headline",
        fontSize: "smallHeadline"
      })
    }
  };

  return {
    text(key, attributes) {
      const attr = {
        length: attributes.value.length,
        start: 0,
        tag: { tag: "FONT", settings: fontConfig.body }
      };
      return new AttributedString(attributes.value, [attr]);
    },
    heading2(key, attributes, children, index, tree) {
      const childStr = AttributedString.join(children);
      return (
        <ArticleParagraphWrapper
          key={key}
          ast={tree}
          style={{ marginBottom: 0 }}
        >
          <Text
            selectable
            allowFontScaling={false}
            style={fontConfig.subheading}
          >
            {childStr.string}
          </Text>
        </ArticleParagraphWrapper>
      );
    },
    heading3(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    heading4(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    heading5(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    heading6(key, attributes, children, index, tree) {
      return this.heading2(key, attributes, children, index, tree);
    },
    bold(key, attributes, children) {
      const childStr = AttributedString.join(children);
      const attr = {
        length: childStr.string.length,
        start: 0,
        tag: { tag: "FONT", settings: fontConfig.bold }
      };
      return new AttributedString(childStr.string, [attr]);
    },
    emphasis(key, attributes, children) {
      return this.bold(key, attributes, children);
    },
    strong(key, attributes, children) {
      return this.bold(key, attributes, children);
    },
    italic(key, attributes, children) {
      const childStr = AttributedString.join(children);
      const attr = {
        length: childStr.string.length,
        start: 0,
        tag: { tag: "FONT", settings: fontConfig.italic }
      };
      return new AttributedString(childStr.string, [attr]);
    },
    link(key, { href, canonicalId, type }, children) {
      const childStr = AttributedString.join(children);
      const attr = {
        length: childStr.string.length,
        start: 0,
        tag: { tag: "LINK", href, canonicalId, type, settings: fontConfig.body }
      };
      return new AttributedString(childStr.string, [attr]);
    },
    subscript(key, attributes, children) {
      const childStr = AttributedString.join(children);
      const attr = {
        length: childStr.string.length,
        start: 0,
        tag: { tag: "FONT", settings: fontConfig.body }
      };
      return new AttributedString(childStr.string, [attr]);
    },
    superscript(key, attributes, children) {
      const childStr = AttributedString.join(children);
      const attr = {
        length: childStr.string.length,
        start: 0,
        tag: { tag: "FONT", settings: fontConfig.body }
      };
      return new AttributedString(childStr.string, [attr]);
    },
    paragraph(key, attributes, children, index, tree) {
      return (
        <ArticleParagraph
          LinkComponent={ArticleLink}
          key={key}
          attributes={attributes}
          index={index}
          tree={tree}
          scale={scale}
          dropcapsDisabled={dropcapsDisabled}
          isTablet={isTablet}
          defaultFont={defaultFont}
          onLinkPress={onLinkPress}
          data={data}
          dropCapFont={dropCapFont}
        >
          {children}
        </ArticleParagraph>
      );
    },
    ad(key, attributes) {
      return (
        <Ad
          key={key}
          adConfig={adConfig}
          slotName="native-inline-ad"
          {...attributes}
        />
      );
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
        relativeVerticalOffset,
        imageIndex
      }
    ) {
      return (
        <ArticleImage
          captionOptions={{
            caption,
            credits
          }}
          onImagePress={onImagePress}
          images={images}
          key={key}
          imageOptions={{
            display:
              !isTablet && caption && display === "inline"
                ? "secondary"
                : display,
            ratio,
            index: imageIndex,
            uri: url,
            relativeWidth,
            relativeHeight,
            relativeHorizontalOffset,
            relativeVerticalOffset
          }}
        />
      );
    },
    interactive(key, { id, display, element }) {
      if (
        Platform.OS === "ios" &&
        element &&
        element.value === "responsive-graphics"
      ) {
        const {
          attributes: { "deck-id": deckId }
        } = element;
        return (
          <InteractiveWrapper.ResponsiveImageInteractive
            deckId={deckId}
            key={key}
          />
        );
      }
      return (
        <View
          key={key}
          style={[
            styles.interactiveContainer,
            isTablet && styles.interactiveContainerTablet,
            display === "fullwidth" && styles.interactiveContainerFullWidth
          ]}
        >
          <InteractiveWrapper config={interactiveConfig} id={id} key={key} />
        </View>
      );
    },
    break() {
      const attr = {
        length: 1,
        start: 0,
        tag: { tag: "FONT", settings: fontConfig.body }
      };
      return new AttributedString("\n", [attr]);
    },
    keyFacts(key, attributes, children, index, tree) {
      return (
        <View style={isTablet && styles.containerTablet}>
          <KeyFacts ast={tree} key={key} onLinkPress={onLinkPress} />
        </View>
      );
    },
    pullQuote(
      key,
      {
        caption: { name, text, twitter }
      },
      children
    ) {
      const content = children[0].string;
      const contentWidth = Math.min(screenWidth(), tabletWidth);
      return (
        <Context.Consumer key={key}>
          {({
            theme: { pullQuoteFont, sectionColour = colours.section.default }
          }) => (
            <View style={[isTablet && { width: contentWidth * 0.35 }]}>
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
      const aspectRatio = 16 / 9;
      const screenW = screenWidth(isTablet);
      const height = screenW / aspectRatio;
      return (
        <View
          key={key}
          style={[styles.primaryContainer, isTablet && styles.containerTablet]}
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
    },
    unknown(key, attributes, children, index, tree) {
      return tree;
    }
  };
};
