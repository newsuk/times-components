import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import Context from "@times-components/context";
import DatePublication from "@times-components/date-publication";
import { colours } from "@times-components/styleguide";
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
  RowWrapper,
  onAuthorPress
}) => {
  const data = [
    ArticleMetaRow(
      styles.datePublication,
      <DatePublication date={publishedTime} publication={publicationName} />,
      "articleDatePublication",
      RowWrapper
    )
  ];

  if (byline && byline.length > 0) {
    return [
      ArticleMetaRow(
        styles.byline,
        <Context.Consumer>
          {({ theme: { sectionColour } }) => (
            <ArticleBylineWithLinks
              ast={byline}
              color={sectionColour || colours.section.default}
              onAuthorPress={onAuthorPress}
            />
          )}
        </Context.Consumer>,
        "articleByline",
        RowWrapper
      ),
      ...data
    ];
  }

  return data;
};

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
  publicationName: PropTypes.string,
  onAuthorPress: PropTypes.func.isRequired
};

ArticleMetaBase.defaultProps = {
  byline: [],
  publishedTime: null,
  publicationName: null,
  RowWrapper: View
};

export default ArticleMetaBase;
