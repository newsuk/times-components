import React from "react";
import Slice from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import { propTypes, defaultProps } from "./proptypes";
import { SubContainer, MainContainer } from "./responsive";

const RelatedArticles = ({ item, template }) => (
  <MainContainer template={template}>
    <RelatedArticlesHeading />
    <SubContainer>
      <Slice item={item} />
    </SubContainer>
  </MainContainer>
);

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
