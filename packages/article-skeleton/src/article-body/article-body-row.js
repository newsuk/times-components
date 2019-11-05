/* eslint-disable prefer-destructuring */
import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import styleguide, {
  colours,
  tabletWidth,
  fonts
} from "@times-components/styleguide";
import {
  FontStorage,
  AttributedString,
  LayoutManager,
  TextContainer,
  BoxExclusion
} from "@times-components/typeset";
import { screenWidth } from "@times-components/utils";
import Ad from "@times-components/ad";
import ArticleImage from "@times-components/article-image";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import PullQuote from "@times-components/pull-quote";
import Video from "@times-components/video";
import ArticleParagraph from "@times-components/article-paragraph";
import Context from "@times-components/context";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";
import ArticleLink from "./article-link";

const makeDropCap = (scale, color, dropCapFont, paragraph) => {
  const letter = paragraph.slice(0, 1);
  if (!letter.attributes.length) {
    return false;
  }
  const baseStyle = letter.attributes[0].tag.settings;
  const fontSize = baseStyle.fontSize * 6;
  const fontSettings = {
    fontFamily: fonts[dropCapFont],
    fontStyle: "",
    fontWeight: "",
    fontSize,
    color
  };
  const font = FontStorage.getFont(fontSettings);
  const glyph = font.charToGlyph(letter.string);
  const { x1, x2, y1, y2 } = glyph.getBoundingBox();
  const width =
    (x2 * fontSize) / font.unitsPerEm - (x1 * fontSize) / font.unitsPerEm;
  const advance = font.getAdvanceWidth(letter.string, baseStyle.fontSize);
  const height =
    (y2 * fontSize) / font.unitsPerEm - (y1 * fontSize) / font.unitsPerEm;
  const gutters = (screenWidth() - Math.min(screenWidth(), tabletWidth)) / 2;
  const exclusion = new BoxExclusion(0, 0, width + advance, height);
  const element = (
    <Text
      allowFontScaling={false}
      style={[
        {
          position: "absolute",
          left: gutters + advance,
          fontSize,
          lineHeight: fontSize,
          top: -(baseStyle.fontSize / 2),
          fontFamily: fonts[dropCapFont],
          color: fontSettings.color
        }
      ]}
    >
      {letter.string}
    </Text>
  );
  return {
    exclusion,
    element
  };
};

const Paragraph = ({
  key,
  children,
  index,
  tree,
  scale,
  dropcapsDisabled,
  isTablet,
  defaultFont,
  onLinkPress,
  data,
  dropCapFont
}) => {
  const str = AttributedString.join(
    children.filter(child => child instanceof AttributedString)
  );
  const [inline] = children.filter(
    child => !(child instanceof AttributedString)
  );

  const { spacing } = styleguide({ scale });

  const dropCap =
    !dropcapsDisabled && index === 1
      ? makeDropCap(scale, colours.section[data.section], dropCapFont, str)
      : false;

  const [inlineExclusion, setInlineExclusion] = useState(false);

  if (!inline && !dropCap) {
    return (
      <ArticleParagraph ast={tree} key={key} uid={key}>
        <Text allowFontScaling={false}>
          {children.map(child => {
            const attribute = child.attributes[0];
            const style = attribute ? attribute.tag.settings : defaultFont;
            const href = attribute ? attribute.tag.href : null;
            const type = href ? attribute.tag.type : null;
            const canonicalId = href ? attribute.tag.canonicalId : null;
            if (href) {
              const { color, ...linkStyle } = style;
              return (
                <ArticleLink
                  url={href}
                  style={linkStyle}
                  onPress={e =>
                    onLinkPress(e, { canonicalId, type, url: href })
                  }
                >
                  {child.string}
                </ArticleLink>
              );
            }
            return <Text style={style}>{child.string}</Text>;
          })}
        </Text>
      </ArticleParagraph>
    );
  }

  const contentWidth = Math.min(screenWidth(), tabletWidth);
  const gutters = (screenWidth() - contentWidth) / 2 + spacing(2);

  const container = new TextContainer(
    isTablet ? contentWidth : screenWidth() - spacing(4),
    10000,
    0,
    0,
    dropCap ? [dropCap.exclusion] : []
  );

  const manager = new LayoutManager(
    dropCap ? str.slice(1) : str,
    [container],
    inlineExclusion ? [inlineExclusion.exclusion] : []
  );

  const positioned = manager.layout(false);

  const lines = positioned[positioned.length - 1].position.line + 1;
  return [
    dropCap && dropCap.element,
    inline && (
      <View
        style={{
          position: "absolute",
          left: gutters,
          width: contentWidth * 0.35
        }}
        onLayout={e => {
          const { height } = e.nativeEvent.layout;
          if (!inlineExclusion) {
            setInlineExclusion({
              exclusion: new BoxExclusion(
                0,
                0,
                contentWidth * 0.35 + spacing(2),
                height + spacing(2)
              ),
              height
            });
          }
        }}
      >
        {inline}
      </View>
    ),
    <ArticleParagraph
      ast={tree}
      key={key}
      uid={key}
      height={Math.max(
        dropCap ? defaultFont.lineHeight * 3 : 0,
        defaultFont.lineHeight * lines,
        inlineExclusion ? inlineExclusion.height : 0
      )}
      accessibilityLabel={positioned.map(p => p.text.text.string).join(" ")}
    >
      {positioned.map(p => {
        const attribute = p.text.text.attributes[0];
        const style = attribute ? attribute.tag.settings : defaultFont;
        const href = attribute ? attribute.tag.href : null;
        const type = href ? attribute.tag.type : null;
        const canonicalId = href ? attribute.tag.canonicalId : null;
        if (href) {
          return (
            <ArticleLink
              url={href}
              onPress={e => onLinkPress(e, { canonicalId, type, url: href })}
              style={{
                position: "absolute",
                left: Math.floor(p.position.xOffset),
                top: Math.floor(defaultFont.lineHeight * p.position.line)
              }}
            >
              {p.text.text.string}
            </ArticleLink>
          );
        }
        return (
          <Text
            allowFontScaling={false}
            selectable
            numberOfLines={1}
            style={[
              {
                position: "absolute",
                left: Math.floor(p.position.xOffset),
                top: Math.floor(defaultFont.lineHeight * p.position.line)
              },
              style
            ]}
          >
            {p.text.text.string}
          </Text>
        );
      })}
    </ArticleParagraph>
  ];
};

export default ({
  data,
  interactiveConfig,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress,
  // onImagePress,
  isTablet,
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
    link: defaultFont
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
    bold(key, attributes, children) {
      const childStr = AttributedString.join(children);
      const attr = {
        length: childStr.string.length,
        start: 0,
        tag: { tag: "FONT", settings: fontConfig.bold }
      };
      return new AttributedString(childStr.string, [attr]);
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
        <Paragraph
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
        </Paragraph>
      );
    },
    ad(key, attributes) {
      return <Ad key={key} slotName="native-inline-ad" {...attributes} />;
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
      return (
        <ArticleImage
          captionOptions={{
            caption,
            credits
          }}
          key={key}
          imageOptions={{
            display,
            ratio,
            uri: url,
            relativeWidth,
            relativeHeight,
            relativeHorizontalOffset,
            relativeVerticalOffset
          }}
        />
      );
    },
    interactive(key, { id, display }) {
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
      return new AttributedString(JSON.stringify(tree, null, 2), []);
    }
  };
};

// TODO: missing node types
