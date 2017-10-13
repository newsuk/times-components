import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import styles from "./styles/article-meta-style";

const ArticleMeta = ({ byline, publishedTime, publicationName }) => (
  <View style={[styles.articleMainContentRow, styles.articleMiddleContainer]}>
    <View style={styles.articleMeta}>
      <View style={[styles.articleMetaElement]}>
        <ArticleByline ast={byline} />
      </View>
      <View style={[styles.articleMetaElement]}>
        <DatePublication
          date={new Date(publishedTime)}
          publication={publicationName}
        />
      </View>
    </View>
  </View>
);

const TextNode = PropTypes.shape({ text: PropTypes.string });

const nodeShape = {
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired
};

nodeShape.children = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.shape(nodeShape), TextNode])
).isRequired;

ArticleMeta.propTypes = {
  byline: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  publishedTime: PropTypes.string,
  publicationName: PropTypes.string
};

ArticleMeta.defaultProps = {
  byline: [],
  publishedTime: null,
  publicationName: null
};

export default ArticleMeta;
