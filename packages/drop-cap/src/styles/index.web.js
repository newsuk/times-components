import styled, { css } from "styled-components";
import { fontFactory } from "@times-components/styleguide";
import sharedStylesFactory from "./shared";
import { spacing } from "../../../styleguide";

const sharedStyles = sharedStylesFactory();

export const styles = {
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    ...fontFactory({
      font: "body",
      fontSize: "body"
    })
  }
};

const textStyleToCSS = textStyle => css`
  font-size: ${textStyle.fontSize}px;
  font-family: ${textStyle.fontFamily};

  ${textStyle.lineHeight &&
    css`
      line-height: ${textStyle.lineHeight}px;
    `} ${textStyle.color &&
      css`
        color: ${textStyle.color}px;
      `};
`;

export const ParagraphContainer = styled.p`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
`;

export const ArticleText = styled.span`
  margin-bottom: ${styles.articleTextElement.marginBottom};
  ${textStyleToCSS(styles.articleTextElement)};
`;

export const DropCap = styled.span`
  float: left;
  -webkit-margin-before: 11px !important;
  padding: 9px 10px 0 0;
  line-height: 0.6em;

  ${textStyleToCSS(styles.dropCapTextElement)};
`;
