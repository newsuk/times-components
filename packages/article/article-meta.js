import React from "react";
import { View } from "react-native";

import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import {
  articleMetaPropTypes,
  articleMetaDefaultPropTypes
} from "./article-meta.proptypes";

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

ArticleMeta.propTypes = articleMetaPropTypes;

ArticleMeta.defaultProps = articleMetaDefaultPropTypes;

export default ArticleMeta;
