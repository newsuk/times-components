import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Ad from "@times-components/ad";
import ArticleImage from "@times-components/article-image";
import ArticleParagraph, {
  DropCapView
} from "@times-components/article-paragraph";
import Context from "@times-components/context";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import { colours } from "@times-components/styleguide";
import Video from "@times-components/video";
import renderTrees from "@times-components/markup-forest";
import { AspectRatioContainer } from "@times-components/utils";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  InteractiveContainer,
  PullQuoteContainer,
  PullQuoteResp
} from "../styles/article-body/responsive";
import styles from "../styles/article-body";

export const responsiveDisplayWrapper = displayType => {
  switch (displayType) {
    case "secondary":
      return SecondaryImg;
    case "inline":
      return InlineImg;
    case "fullwidth":
      return Fragment;
    default:
      return PrimaryImg;
  }
};

const renderers = ({ observed, registerNode, paidContentClassName }) => ({
  ...coreRenderers,
  ad(key, attributes) {
    return {
      element: (
        <Ad key={key} slotName="inline-ad" style={styles.ad} {...attributes} />
      )
    };
  },
  dropCap(key, attrs, children) {
    return {
      element: (
        <Context.Consumer key={key}>
          {({
            theme: { dropCapFont, sectionColour = colours.section.default }
          }) => (
            <DropCapView colour={sectionColour} font={dropCapFont}>
              {children}
            </DropCapView>
          )}
        </Context.Consumer>
      )
    };
  },
  image(key, { display, ratio, url, caption, credits }) {
    const MediaWrapper = responsiveDisplayWrapper(display);
    return {
      element: (
        <div id={key} key={key} ref={node => registerNode(node)}>
          <MediaWrapper>
            <ArticleImage
              captionOptions={{
                caption,
                credits
              }}
              imageOptions={{
                display,
                highResSize: observed.get(key)
                  ? observed.get(key).clientWidth
                  : null,
                lowResSize: 100,
                ratio,
                uri: url
              }}
            />
          </MediaWrapper>
        </div>
      )
    };
  },
  interactive(key, { url, element }) {
    const { attributes, value } = element;
    return {
      element: (
        <InteractiveContainer key={key}>
          <InteractiveWrapper
            attributes={attributes}
            element={value}
            key={key}
            source={url}
          />
        </InteractiveContainer>
      )
    };
  },
  keyFacts(key, attributes, renderedChildren, indx, node) {
    return {
      element: <KeyFacts ast={node} key={key} />,
      shouldRenderChildren: false
    };
  },
  link(key, attributes, children) {
    const { href, target, dropCap } = attributes;

    return {
      element: (
        <ArticleLink dropCap={dropCap} key={key} target={target} url={href}>
          {children}
        </ArticleLink>
      )
    };
  },
  paragraph(key, attributes, children) {
    return {
      element: <ArticleParagraph key={key}>{children}</ArticleParagraph>
    };
  },
  paywall(key, attributes, children) {
    return {
      element: (
        <span className={paidContentClassName} key={key}>
          {children}
        </span>
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
            <PullQuoteContainer>
              <PullQuoteResp>
                <PullQuote
                  caption={name}
                  font={pullQuoteFont}
                  quoteColour={sectionColour}
                  text={text}
                  twitter={twitter}
                >
                  {children}
                </PullQuote>
              </PullQuoteResp>
            </PullQuoteContainer>
          )}
        </Context.Consumer>
      )
    };
  },
  video(
    key,
    {
      id,
      is360,
      brightcovePolicyKey,
      brightcoveVideoId,
      brightcoveAccountId,
      brightcovePlayerId,
      caption,
      posterImageUrl,
      skysports
    }
  ) {
    const MediaWrapper = responsiveDisplayWrapper("primary");
    return {
      element: (
        <MediaWrapper key={key}>
          <figure style={{ margin: 0 }}>
            <AspectRatioContainer aspectRatio="16:9">
              <Video
                id={id}
                is360={is360}
                accountId={brightcoveAccountId}
                height="100%"
                playerId={brightcovePlayerId}
                policyKey={brightcovePolicyKey}
                poster={{ uri: posterImageUrl }}
                skySports={skysports}
                videoId={brightcoveVideoId}
                width="100%"
              />
            </AspectRatioContainer>
            <figcaption>
              <InsetCaption caption={caption} />
            </figcaption>
          </figure>
        </MediaWrapper>
      )
    };
  }
});

const decorateAd = ({ contextUrl, section }) => element =>
  element.name === "ad"
    ? { ...element, attributes: { ...element.attributes, contextUrl, section } }
    : element;

const ArticleBody = ({
  content: bodyContent,
  contextUrl,
  observed,
  registerNode,
  section,
  paidContentClassName
}) =>
  renderTrees(
    bodyContent.map(decorateAd({ contextUrl, section })),
    renderers({ observed, registerNode, paidContentClassName })
  );

ArticleBody.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    })
  ).isRequired,
  contextUrl: PropTypes.string.isRequired,
  paidContentClassName: PropTypes.string,
  section: PropTypes.string
};

export default ArticleBody;
