import React from "react";
import { View } from "react-native";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";
import { fonts } from "@times-components/ts-styleguide";
import Context from "@times-components/context";
import { gqlRgbaToStyle } from "@times-components/utils";

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

  return (
    <Context.Consumer>
      {({ theme: { headlineFont, headlineCase } }) => (
        <View
          style={{ backgroundColor: backgroundColour, order: 2, width: "100%" }}
        >
          <HeaderContainer style={styles.container}>
            <Label color={textColour} isVideo={hasVideo} label={label} />
            <HeadlineContainer
              accessibilityRole="header"
              aria-level="1"
              style={[
                styles.articleHeadline,
                { color: textColour },
                headlineFont ? { fontFamily: fonts[headlineFont] } : null,
                headlineCase ? { textTransform: headlineCase } : null
              ]}
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
        </View>
      )}
    </Context.Consumer>
  );
};

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
