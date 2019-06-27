import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";
import styles from "../styles/article-meta";

const ArticleMetaRow = (
  textStyle,
  rowWrapperStyles = {},
  component,
  key,
  RowWrapper
) => (
  <RowWrapper key={key} style={rowWrapperStyles}>
    <Text style={textStyle}>{component}</Text>
  </RowWrapper>
);

const hasBylineData = bylines =>
  bylines.length > 0 && bylines[0].byline && bylines[0].byline.length > 0;

const ArticleMetaBase = ({
  bylines,
  publicationName,
  publishedTime,
  RowWrapper,
  onAuthorPress
}) => {
  const data = [
    ArticleMetaRow(
      styles.datePublication,
      !hasBylineData(bylines)
        ? styles.articleMetaElementWithBorder
        : styles.articleMetaElement,
      <DatePublication date={publishedTime} publication={publicationName} />,
      "articleDatePublication",
      RowWrapper
    )
  ];

  if (hasBylineData(bylines)) {
    return [
      ArticleMetaRow(
        styles.byline,
        styles.articleMetaElementWithBorder,
        <ArticleBylineWithLinks ast={bylines} onAuthorPress={onAuthorPress} />,
        "articleByline",
        RowWrapper
      ),
      ...data
    ];
  }

  return data;
};

const TextNode = PropTypes.shape({ text: PropTypes.string });

const childNode = {
  attributes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

const nodeShape = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape(childNode), TextNode])
  ).isRequired
};

ArticleMetaBase.propTypes = {
  bylines: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  onAuthorPress: PropTypes.func,
  publicationName: PropTypes.string,
  publishedTime: PropTypes.string
};

ArticleMetaBase.defaultProps = {
  bylines: [],
  publicationName: null,
  publishedTime: null,
  RowWrapper: View
};

export default ArticleMetaBase;
