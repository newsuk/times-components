import React from "react";
import PropTypes from "prop-types";
import { View} from "react-native";

import ArticleByline from "@times-components/article-byline";
import DatePublication from "@times-components/date-publication";

import {ArticleMetaContainer, ArticleMetaElement, ArticleMiddleContainer} from "./styles/meta/styled-components";


const ArticleMeta = ({ byline, publishedTime, publicationName }) => (
  <ArticleMiddleContainer>
    <View>
      <ArticleMetaContainer>
        <View>
          <ArticleMetaElement>
            <View>
              <ArticleByline ast={byline} />
            </View>
          </ArticleMetaElement>
          <ArticleMetaElement>
            <View>
              <DatePublication
                date={new Date(publishedTime)}
                publication={publicationName}
              />
            </View>
          </ArticleMetaElement>
        </View>
      </ArticleMetaContainer>
    </View>
  </ArticleMiddleContainer>
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
