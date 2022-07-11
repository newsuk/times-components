import React from "react";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";
import { fonts } from "@times-components/ts-styleguide";
import Context from "@times-components/context";
import {
  gqlRgbaToStyle,
  checkStylesForUnits,
  TcView
} from "@times-components/utils";

import Label from "../article-label/article-label";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

import {
  FlagsContainer,
  HeaderContainer,
  HeadlineContainer
} from "../styles/responsive";

const ArticleHeader = ({
  backgroundColour: rgbBackgroundColour,
  flags,
  hasVideo,
  headline,
  label,
  standfirst,
  textColour: rgbTextColour,
  updatedTime
}) => {
  const backgroundColour = gqlRgbaToStyle(rgbBackgroundColour);
  const textColour = gqlRgbaToStyle(rgbTextColour);
  const headlineContainerStyles = (headlineFont, headlineCase) =>
    checkStylesForUnits({
      ...styles.articleHeadline,
      color: textColour,
      fontFamily: headlineFont ? fonts[headlineFont] : null,
      textTransform: headlineCase || null
    });

  return (
    <Context.Consumer>
      {({ theme: { headlineFont, headlineCase } }) => (
        <TcView
          style={{ backgroundColor: backgroundColour, order: 2, width: "100%" }}
        >
          <HeaderContainer styles={styles.container}>
            <Label color={textColour} isVideo={hasVideo} label={label} />
            <HeadlineContainer
              role="heading"
              aria-level="1"
              styles={headlineContainerStyles(headlineFont, headlineCase)}
            >
              {headline}
            </HeadlineContainer>
            <FlagsContainer>
              <UpdatedTimeProvider updatedTime={updatedTime}>
                <ArticleFlags color={textColour} flags={flags} />
              </UpdatedTimeProvider>
            </FlagsContainer>
            <Standfirst color={textColour} standfirst={standfirst} />
          </HeaderContainer>
        </TcView>
      )}
    </Context.Consumer>
  );
};

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
