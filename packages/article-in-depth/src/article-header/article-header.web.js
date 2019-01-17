import React from "react";
import { View } from "react-native";
import Context from "@times-components/context";
import { fonts } from "@times-components/styleguide";
import { gqlRgbaToStyle } from "@times-components/utils";

import Label from "../article-label/article-label";
import Flags from "../article-flags/article-flags";
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
  textColour: rgbTextColour
}) => {
  const backgroundColour = gqlRgbaToStyle(rgbBackgroundColour);
  const textColour = gqlRgbaToStyle(rgbTextColour);
  return (
    <Context.Consumer>
      {({ theme: { headlineFont } }) => (
        <View
          style={{ backgroundColor: backgroundColour, order: 2, width: "100%" }}
        >
          <HeaderContainer style={styles.container}>
            <Label color={textColour} isVideo={hasVideo} label={label} />
            <HeadlineContainer
              accessibilityRole="heading"
              aria-level="1"
              style={[
                styles.articleHeadline,
                { color: textColour },
                headlineFont ? { fontFamily: fonts[headlineFont] } : null
              ]}
            >
              {headline}
            </HeadlineContainer>
            <FlagsContainer>
              <Flags color={textColour} flags={flags} />
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
