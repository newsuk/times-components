import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import ArticleImage from "@times-components/article-image";
import Ad from "@times-components/ad";
import KeyFacts from "@times-components/key-facts";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import { colours, spacing } from "@times-components/styleguide";
import Video from "@times-components/video";
import BodyParagraph from "./article-body-paragraph";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";

const primaryContainer = {
  width: "100%",
  flexDirection: "column",
  paddingBottom: spacing(5)
};

const styles = StyleSheet.create({
  ad: {
    borderTopColor: colours.functional.keyline,
    borderBottomColor: colours.functional.keyline,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  }
});

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
    paragraph(key, attributes, children) {
      return {
        element: (
          <BodyParagraph key={index} uid={index}>
            {children}
          </BodyParagraph>
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
                url
              }}
            />
          </View>
        )
      };
    },
    pullQuote(key, { content, caption: { name, twitter } }) {
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
                url: attributes.href,
                type: attributes.type,
                canonicalId: attributes.canonicalId
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

      return {
        element: (
          <View key={key} style={primaryContainer}>
            <Video
              accountId={brightcoveAccountId}
              height={height}
              onVideoPress={onVideoPress}
              policyKey={brightcovePolicyKey}
              poster={{ uri: posterImageUrl }}
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
