/* eslint-disable react/prop-types */
import React from "react";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import styled from "styled-components";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const OpinionText = styled(TcText)`
  ${checkStylesForUnits(styles.opinion)};
`;

const AuthorComponent = ({ children, key, className }) => (
  <OpinionText className={className} key={key}>
    {children}
  </OpinionText>
);

const ArticleBylineOpinion = ({ ast, ...props }) =>
  renderByline(AuthorComponent, ast, styles.opinion, props);

ArticleBylineOpinion.displayName = "ArticleBylineOpinion";

ArticleBylineOpinion.propTypes = propTypes;
ArticleBylineOpinion.defaultProps = defaultProps;

export default ArticleBylineOpinion;
