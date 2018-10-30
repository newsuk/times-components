import React from "react";
import { Dimensions, View } from "react-native";
import PropTypes from "prop-types";
import ArticleImage from "@times-components/article-image";
import ArticleParagraph from "@times-components/article-paragraph";
import Ad from "@times-components/ad";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import Video from "@times-components/video";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";

const styles = styleFactory();

const ArticleRow = ({
  content: { data, index },
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress
}) =>
  renderTree(data, {
    ...coreRenderers,
    ad(key, attributes) {
      return {
        element: (
          <Ad
            key={key}
            slotName="native-inline-ad"
            style={styles.ad}
            {...attributes}
          />
        )
      };
    },
    image(key, { display, ratio, url, caption, credits }) {
      return {
        element: (
          <View key={key}>
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
          </View>
        )
      };
    },
    interactive(key, { id }) {
      return {
        element: (
          <View key={key} style={styles.interactiveContainer}>
            <InteractiveWrapper id={id} />
          </View>
        )
      };
    },
    keyFacts(key, attributes, renderedChildren, indx, node) {
      return {
        element: <KeyFacts ast={node} key={key} onLinkPress={onLinkPress} />,
        shouldRenderChildren: false
      };
    },
    link(key, attributes, children) {
      const url = attributes.href;

      return {
        element: (
          <ArticleLink
            key={index}
            onPress={e =>
              onLinkPress(e, {
                canonicalId: attributes.canonicalId,
                type: attributes.type,
                url: attributes.href
              })
            }
            url={url}
            uuid={index}
          >
            {children}
          </ArticleLink>
        )
      };
    },
    paragraph(key, attributes, children, indx, node) {
      return {
        element: (
          <ArticleParagraph ast={node} key={index} uid={index}>
            {children}
          </ArticleParagraph>
        )
      };
    },
    pullQuote(
      key,
      {
        content,
        caption: { name, twitter }
      }
    ) {
      return {
        element: (
          <View key={key}>
            <PullQuote
              caption={name}
              content={content}
              key={key}
              onTwitterLinkPress={onTwitterLinkPress}
              twitter={twitter}
            />
          </View>
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
      const aspectRatio = 16 / 9;

      const { width } = Dimensions.get("window");
      const height = width / aspectRatio;

      return {
        element: (
          <View key={key} style={styles.primaryContainer}>
            <Video
              accountId={brightcoveAccountId}
              height={height}
              onVideoPress={onVideoPress}
              policyKey={brightcovePolicyKey}
              poster={{ uri: posterImageUrl }}
              skySports={skySports}
              videoId={brightcoveVideoId}
              width={width}
            />
            <InsetCaption caption={caption} />
          </View>
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
  onLinkPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};

export default ArticleRow;
