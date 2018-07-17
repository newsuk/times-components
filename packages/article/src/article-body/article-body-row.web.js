import React from "react";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import Video from "@times-components/video";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";
import ArticleLink from "./article-link";
import AspectRatioContainer from "./media-aspect-ratio";
import InsetCaption from "./inset-caption";
import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  PullQuoteContainer,
  PullQuoteResp
} from "../styles/article-body/responsive";

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

const ArticleRow = ({ content: { data, index }, onLinkPress }) =>
  renderTrees([data], {
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
                url
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
        caption
      }
    ) {
      const MediaWrapper = responsiveDisplayWrapper("primary");
      return {
        element: (
          <MediaWrapper key={key}>
            <AspectRatioContainer aspectRatio="16:9">
              <Video
                accountId={brightcoveAccountId}
                height="100%"
                policyKey={brightcovePolicyKey}
                poster={{ uri: posterImageUrl }}
                videoId={brightcoveVideoId}
                width="100%"
              />
            </AspectRatioContainer>
            <InsetCaption caption={caption} />
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
    link(key, attributes, children) {
      const { href, target } = attributes;

      return {
        element: (
          <ArticleLink
            key={key}
            onPress={e => onLinkPress(e, { href })}
            target={target}
            url={href}
            uuid={index}
          >
            {children}
          </ArticleLink>
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
  onLinkPress: PropTypes.func.isRequired
};

export default ArticleRow;
