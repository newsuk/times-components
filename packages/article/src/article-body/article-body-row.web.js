import React from "react";
import PropTypes from "prop-types";
import Ad from "@times-components/ad";
import ArticleImage from "@times-components/article-image";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import Video from "@times-components/video";
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

const ArticleRow = ({ content: { data, index } }) =>
  renderTree(data, {
    ...coreRenderers,
    ad(key, attributes) {
      return {
        element: (
          <Ad
            key={key}
            slotName="inline-ad"
            style={styles.ad}
            {...attributes}
          />
        )
      };
    },
    paragraph(key, attributes, children) {
      return {
        element: (
          <BodyParagraph key={key} uid={index}>
            {children}
          </BodyParagraph>
        )
      };
    },
    image(key, { display, ratio, url, caption, credits }) {
      const MediaWrapper = responsiveDisplayWrapper(display);
      return {
        element: (
          <MediaWrapper key={key}>
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
          </MediaWrapper>
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
                  skySports={skySports}
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
          <ArticleLink key={key} target={target} url={href} uuid={index}>
            {children}
          </ArticleLink>
        )
      };
    },
    interactive(key, { url, element }) {
      const { attributes, value } = element;
      return {
        element: (
          <InteractiveContainer>
            <InteractiveWrapper
              attributes={attributes}
              element={value}
              key={key}
              source={url}
            />
          </InteractiveContainer>
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
  }).isRequired
};

export default ArticleRow;
