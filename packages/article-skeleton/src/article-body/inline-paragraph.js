/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import { TcView, TcText, screenWidth } from "@times-components/utils";
import PropTypes from "prop-types";
import { tabletWidth, styleguide } from "@times-components/ts-styleguide";
import {
  TextContainer,
  LayoutManager,
  BoxExclusion
} from "@times-components/typeset";
import ArticleParagraphWrapper from "@times-components/article-paragraph";

const InlineParagraph = ({
  onLinkPress,
  isTablet,
  dropCap,
  str,
  scale,
  inline,
  tree,
  key,
  defaultFont,
  LinkComponent
}) => {
  const { spacing } = styleguide({ scale });
  const [inlineExclusion, setInlineExclusion] = useState(false);

  if (!str.length) {
    return null;
  }

  const contentWidth = Math.min(screenWidth(), tabletWidth);
  const gutters = (screenWidth() - contentWidth) / 2 + spacing(2);

  const container = new TextContainer(
    isTablet ? contentWidth : screenWidth() - spacing(4),
    Infinity,
    0,
    0,
    dropCap ? [dropCap.exclusion] : []
  );

  const slice = str.charAt(1) === " " ? 2 : dropCap.length;

  const manager = new LayoutManager(
    dropCap ? str.slice(slice) : str,
    [container],
    inlineExclusion ? [inlineExclusion.exclusion] : []
  );

  const positioned = manager.layout();

  return [
    dropCap && (
      <TcView style={{ left: gutters - spacing(2) }}>{dropCap.element}</TcView>
    ),
    inline && (
      <TcView
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
      </TcView>
    ),
    <ArticleParagraphWrapper
      ast={tree}
      key={key}
      uid={key}
      height={Math.max(
        dropCap ? defaultFont.lineHeight * 3 : 0,
        !positioned.length
          ? 0
          : positioned[positioned.length - 1].position.y +
            defaultFont.lineHeight,
        inlineExclusion ? inlineExclusion.height : 0
      )}
    >
      {positioned.map((p, i) => {
        const [attribute, href] = p.text.collapsedAttributes(0);
        const style = attribute ? attribute.settings : defaultFont;
        const type = href ? href.type : null;
        const canonicalId = href ? href.canonicalId : null;
        if (href) {
          const { color, ...linkStyle } = style;
          return (
            <LinkComponent
              url={href}
              onPress={e =>
                onLinkPress(e, { canonicalId, type, url: href.href })
              }
              style={{
                ...linkStyle,
                position: "absolute",
                left: p.position.x,
                top: p.position.y
              }}
            >
              {p.text.string}
            </LinkComponent>
          );
        }
        return (
          <TcText
            key={i.toString()}
            allowFontScaling={false}
            selectable
            numberOfLines={1}
            style={[
              {
                position: "absolute",
                left: p.position.x,
                top: p.position.y
              },
              style
            ]}
          >
            {p.text.string}
          </TcText>
        );
      })}
    </ArticleParagraphWrapper>
  ];
};

InlineParagraph.propTypes = {
  onLinkPress: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
  dropCap: PropTypes.object.isRequired,
  str: PropTypes.object.isRequired,
  scale: PropTypes.string.isRequired,
  inline: PropTypes.object.isRequired,
  tree: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
  defaultFont: PropTypes.object.isRequired,
  LinkComponent: PropTypes.func.isRequired
};

export default InlineParagraph;
