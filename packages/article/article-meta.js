import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";
import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import styles from "./styles/meta";
import { MetaElement, Meta } from "./styles/meta/responsive";

const { style: ViewStylePropTypes } = ViewPropTypes;

const ArticleMeta = ({ byline, publishedTime, publicationName, style }) => (
  <Meta style={[styles.articleMiddleContainer, ...style]}>
    <View style={styles.articleMeta}>
      <View style={[styles.articleMetaElement]}>
        <ArticleByline ast={byline} WrapperComponent={MetaElement} />
      </View>
      <View style={[styles.articleMetaElement]}>
        <DatePublication
          date={new Date(publishedTime)}
          publication={publicationName}
          WrapperComponent={MetaElement}
        />
      </View>
    </View>
  </Meta>
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
  publicationName: PropTypes.string,
  style: ViewStylePropTypes
};

ArticleMeta.defaultProps = {
  byline: [],
  publishedTime: null,
  publicationName: null,
  style: {}
};

export default ArticleMeta;
