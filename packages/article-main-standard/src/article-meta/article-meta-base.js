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
  publicationName,
  publishedTime,
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
  byline: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  onAuthorPress: PropTypes.func,
  publicationName: PropTypes.string,
  publishedTime: PropTypes.string
};

ArticleMetaBase.defaultProps = {
  byline: [],
  publicationName: null,
  publishedTime: null,
  RowWrapper: View
};

export default ArticleMetaBase;
