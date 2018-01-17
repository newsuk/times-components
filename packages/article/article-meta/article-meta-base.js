import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import styles from "../styles/article-meta";

const ArticleMetaRow = (textStyle, component, key, RowWrapper) => (
  <RowWrapper key={key} style={styles.articleMetaElement}>
    <Text style={textStyle}>{component}</Text>
  </RowWrapper>
);

const ArticleMetaBase = ({
  byline,
  publishedTime,
  publicationName,
  RowWrapper
}) => [
  ArticleMetaRow(
    styles.byline,
    <ArticleByline ast={byline} />,
    "articleByline",
    RowWrapper
  ),
  ArticleMetaRow(
    styles.datePublication,
    <DatePublication date={publishedTime} publication={publicationName} />,
    "articleDatePublication",
    RowWrapper
  )
];

const TextNode = PropTypes.shape({ text: PropTypes.string });

const nodeShape = {
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired
};

nodeShape.children = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.shape(nodeShape), TextNode])
).isRequired;

ArticleMetaBase.propTypes = {
  byline: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  publishedTime: PropTypes.string,
  publicationName: PropTypes.string
};

ArticleMetaBase.defaultProps = {
  byline: [],
  publishedTime: null,
  publicationName: null,
  RowWrapper: View
};

export default ArticleMetaBase;
