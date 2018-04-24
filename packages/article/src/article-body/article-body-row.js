import React from "react";
import { Dimensions, View } from "react-native";
import PropTypes from "prop-types";
import { spacing } from "@times-components/styleguide";
import Video from "@times-components/video";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import PullQuote from "@times-components/pull-quote";
import BodyParagraph from "./article-body-paragraph";
import ArticleLink from "./article-link";
// To fix a jest coverage issue
import AspectRatioContainer from "./media-aspect-ratio"; // eslint-disable-line no-unused-vars
import InsetCaption from "./inset-caption";

const primaryContainer = {
  width: "100%",
  flexDirection: "column",
  paddingBottom: spacing(5)
};

const ArticleRow = ({ content: { data, index }, onLinkPress, onVideoPress }) =>
  renderTrees([data], {
    paragraph(key, attributes, children) {
      return (
        <BodyParagraph key={index} uid={index}>
          {children}
        </BodyParagraph>
      );
    },
    image(key, { display, ratio, url, caption, credits }) {
      return (
        <View key={key}>
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
        </View>
      );
    },
    pullQuote(key, { content, caption: { name, twitter } }) {
      return (
        <View key={key}>
          <PullQuote
            key={key}
            content={content}
            caption={name}
            twitter={twitter}
          />
        </View>
      );
    },
    link(key, attributes, children) {
      const url = attributes.href;

      return (
        <ArticleLink
          key={index}
          uuid={index}
          onPress={e =>
            onLinkPress(e, {
              url: attributes.href,
              type: attributes.type,
              canonicalId: attributes.canonicalId
            })
          }
          url={url}
        >
          {children}
        </ArticleLink>
      );
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
      const aspectRatio = 16 / 9;

      const { width } = Dimensions.get("window");
      const height = width / aspectRatio;

      return (
        <View key={key} style={primaryContainer}>
          <Video
            width={width}
            height={height}
            policyKey={brightcovePolicyKey}
            videoId={brightcoveVideoId}
            accountId={brightcoveAccountId}
            poster={{ uri: posterImageUrl }}
            onVideoPress={onVideoPress}
          />
          <InsetCaption caption={caption} />
        </View>
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
  onLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};

export default ArticleRow;
