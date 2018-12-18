import React from "react";
import { View } from "react-native";
import Context from "@times-components/context";
import { fonts } from "@times-components/styleguide";

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
  backgroundColour,
  flags,
  headline,
  label,
  standfirst,
  textColour
}) => (
  <Context.Consumer>
    {({ theme: { headlineFont } }) => (
      <View
        style={{ backgroundColor: backgroundColour, order: 2, width: "100%" }}
      >
        <HeaderContainer style={styles.container}>
          <Label color={textColour} label={label} />
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

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
