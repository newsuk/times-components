import React from "react";
import { SubContainer, MainContainer } from "./styles/responsive";
import RelatedArticlesContent from "./related-articles-content";
import RelatedArticlesHeading from "./related-articles-heading";
import { propTypes, defaultProps } from "./related-articles-prop-types";

const RelatedArticles = ({ item, template }) => (
  <MainContainer template={template}>
    <RelatedArticlesHeading />
    <SubContainer>
      <RelatedArticlesContent item={item} />
    </SubContainer>
  </MainContainer>
);

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
