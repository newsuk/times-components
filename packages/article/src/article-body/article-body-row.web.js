import React from "react";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import BrightcoveVideo from "@times-components/brightcove-video";
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
      return (
        <BodyParagraph key={key} uid={index}>
          {children}
        </BodyParagraph>
      );
    },
    image(key, { display, ratio, url, caption, credits }) {
      const MediaWrapper = responsiveDisplayWrapper(display);
      return (
        <MediaWrapper key={key}>
          <ArticleImage
            imageOptions={{
              display,
              ratio,
              url
            }}
            captionOptions={{
              caption,
              credits
            }}
          />
        </MediaWrapper>
      );
    },
    video(
      key,
      {
        display,
        brightcovePolicyKey,
        brightcoveVideoId,
        brightcoveAccountId,
        posterimageUrl,
        caption
      }
    ) {
      const MediaWrapper = responsiveDisplayWrapper(display);
      return (
        <MediaWrapper key={key}>
          <AspectRatioContainer aspectRatio="16:9">
            <BrightcoveVideo
              width="100%"
              height="100%"
              policyKey={brightcovePolicyKey}
              videoId={brightcoveVideoId}
              accountId={brightcoveAccountId}
              poster={{ uri: posterimageUrl }}
            />
          </AspectRatioContainer>
          <InsetCaption caption={caption} />
        </MediaWrapper>
      );
    },
    pullQuote(key, { content, caption: { name, twitter } }) {
      return (
        <PullQuoteContainer key={key}>
          <PullQuoteResp>
            <PullQuote content={content} caption={name} twitter={twitter} />
          </PullQuoteResp>
        </PullQuoteContainer>
      );
    },
    link(key, attributes, children) {
      const url = attributes.href;

      return (
        <ArticleLink
          key={key}
          uuid={index}
          onPress={e => onLinkPress(e, { url })}
          url={url}
        >
          {children}
        </ArticleLink>
      );
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
