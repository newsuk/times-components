import React from "react";
import PropTypes from "prop-types";
import Ad from "@times-components/ad";
import ArticleImage from "@times-components/article-image";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import Video from "@times-components/video";
import renderTrees from "@times-components/markup-forest";
import BodyParagraph from "./article-body-paragraph";
import ArticleLink from "./article-link";
import AspectRatioContainer from "../media-aspect-ratio";
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
    default:
      return PrimaryImg;
  }
};

const renderers = ({ observed, registerNode }) => ({
  ...coreRenderers,
  ad(key, attributes) {
    return {
      element: (
        <Ad key={key} slotName="inline-ad" style={styles.ad} {...attributes} />
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
    const { href, target } = attributes;

    return {
      element: (
        <ArticleLink key={key} target={target} url={href}>
          {children}
        </ArticleLink>
      )
    };
  },
  paragraph(key, attributes, children) {
    return {
      element: <BodyParagraph key={key}>{children}</BodyParagraph>
    };
  },
  pullQuote(key, { content, caption: { name, twitter } }) {
    return {
      element: (
        <PullQuoteContainer key={key}>
          <PullQuoteResp>
            <PullQuote caption={name} content={content} twitter={twitter} />
          </PullQuoteResp>
        </PullQuoteContainer>
      )
    };
  },
  video(
    key,
    {
      brightcovePolicyKey,
      brightcoveVideoId,
      brightcoveAccountId,
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
                accountId={brightcoveAccountId}
                height="100%"
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
  section
}) =>
  renderTrees(
    bodyContent.map(decorateAd({ contextUrl, section })),
    renderers({ observed, registerNode })
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
  section: PropTypes.string
};

export default ArticleBody;
