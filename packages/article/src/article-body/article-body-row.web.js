import React from "react";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BrightcoveVideo from "@times-components/brightcove-video";
import BodyParagraph from "./article-body-paragraph";
import ArticleLink from "./article-link";
import AspectRatioContainer from "../media-aspect-ratio";
import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  PullQuoteContainer,
  PullQuoteResp
} from "../styles/article-body/responsive";
import InsetCaption from "../inset-caption";

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
        posterImage,
        caption
      }
    ) {
      const MediaWrapper = responsiveDisplayWrapper(display);
      return (
        <MediaWrapper key={key}>
          <AspectRatioContainer aspectRatio={posterImage.crop.ratio}>
            <BrightcoveVideo
              width="100%"
              height="100%"
              policyKey={brightcovePolicyKey}
              videoId={brightcoveVideoId}
              accountId={brightcoveAccountId}
              poster={{ uri: posterImage.crop.url }}
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
      return (
        <ArticleLink
          key={key}
          uuid={index}
          onPress={() => {}}
          url={attributes.href}
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
  }).isRequired
};

export default ArticleRow;
