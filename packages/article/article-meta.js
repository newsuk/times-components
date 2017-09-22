import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import styles from "./article-style";

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

ArticleMeta.propTypes = {
  byline: PropTypes.arrayOf(PropTypes.object),
  publishedTime: PropTypes.string,
  publicationName: PropTypes.string
};

ArticleMeta.defaultProps = {
  byline: [],
  publishedTime: null,
  publicationName: null
};

export default ArticleMeta;
