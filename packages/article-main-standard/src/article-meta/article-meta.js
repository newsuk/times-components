import React from "react";
import { Text, View } from "react-native";
import {
  ArticleBylineWithLinks,
  hasBylineData
} from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import { defaultProps, propTypes } from "./article-meta-prop-types";
import styles from "../styles/article-meta";

function ArticleMeta({
  isTablet,
  bylines,
  publicationName,
  publishedTime,
  onAuthorPress
}) {
  return (
    <View style={[styles.articleMeta, isTablet && styles.articleMetaTablet]}>
      {hasBylineData(bylines) && (
        <View style={styles.articleMetaElementWithBorder}>
          <Text style={styles.byline}>
            <ArticleBylineWithLinks
              ast={bylines}
              onAuthorPress={onAuthorPress}
            />
          </Text>
        </View>
      )}
      <View
        style={
          hasBylineData(bylines)
            ? styles.articleMetaElement
            : styles.articleMetaElementWithBorder
        }
      >
        <Text style={styles.datePublication}>
          <DatePublication date={publishedTime} publication={publicationName} />
        </Text>
      </View>
    </View>
  );
}

ArticleMeta.propTypes = propTypes;
ArticleMeta.defaultProps = defaultProps;

export default ArticleMeta;
