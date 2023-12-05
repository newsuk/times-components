/* eslint-disable react/prop-types */
import React from "react";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import styled from "styled-components";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const BylineText = styled(TcText)`
  ${props =>
    props.style ? checkStylesForUnits(props.style) : ""} ${checkStylesForUnits(
    styles.nonLinkText
  )};
`;

const AuthorComponent = ({ children, key, className, bylineStyle }) => (
  <BylineText className={className} key={key} style={bylineStyle}>
    {children}
  </BylineText>
);

const ArticleByline = ({ ast, ...props }) =>
  renderByline(AuthorComponent, ast, styles.nonLinkText, props);

ArticleByline.displayName = "ArticleByline";
ArticleByline.propTypes = propTypes;
ArticleByline.defaultProps = defaultProps;

export { default as ArticleBylineOpinion } from "./article-byline-opinion";
export { default as ArticleBylineWithLinks } from "./article-byline-with-links";
export { default as hasBylineData } from "./has-byline-data";
export default ArticleByline;
