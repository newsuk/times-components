import React from "react";
import styled from "styled-components";
import { TcView, checkStylesForUnits } from "@times-components/utils";
import PropTypes from "prop-types";

import styles from "./styles";

export const HeadingForRelatedArticles = styled.h3`
  border: 0px solid black;
  box-sizing: border-box;
  display: inline;
  font-size: 14px;
  font-family: sans-serif;
  margin: 0px;
  padding: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  ${props => props.styles && props.styles};
`;

const RelatedArticlesHeading = ({ heading }) => (
  <TcView style={styles.titleContainer}>
    <HeadingForRelatedArticles
      role="heading"
      aria-level="3"
      styles={checkStylesForUnits(styles.title)}
    >
      {heading}
    </HeadingForRelatedArticles>
  </TcView>
);

RelatedArticlesHeading.propTypes = {
  heading: PropTypes.string
};

RelatedArticlesHeading.defaultProps = {
  heading: "Related articles"
};

export default RelatedArticlesHeading;
