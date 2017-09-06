import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import styles from "./article-style";

const ArticleHeader = ({ byline, publishedTime, publicationName }) =>
  <View style={[styles.ArticleMainContentRow, styles.ArticleMiddleContainer]}>
    <View style={styles.ArticleMeta}>
      <View style={[styles.ArticleMetaElement]}>
        <ArticleByline ast={byline} />
      </View>
      <View style={[styles.ArticleMetaElement]}>
        <DatePublication
          date={new Date(publishedTime)}
          publication={publicationName}
        />
      </View>
    </View>
  </View>;

ArticleHeader.propTypes = {
  byline: PropTypes.arrayOf(PropTypes.object),
  publishedTime: PropTypes.string,
  publicationName: PropTypes.string
};

ArticleHeader.defaultProps = {
  byline: [],
  publishedTime: null,
  publicationName: null
};

export default ArticleHeader;
