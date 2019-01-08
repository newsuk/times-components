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
  hasVideo,
  headline,
  label,
  standfirst,
  textColour
}) => {
  const bgColour =
    backgroundColour && backgroundColour.rgba
      ? `rgba(${backgroundColour.rgba.red}, ${backgroundColour.rgba.green}, ${
          backgroundColour.rgba.blue
        }, ${backgroundColour.rgba.alpha})`
      : null;
  const txtColour =
    textColour && textColour.rgba
      ? `rgba(${textColour.rgba.red}, ${textColour.rgba.green}, ${
          textColour.rgba.blue
        }, ${textColour.rgba.alpha})`
      : null;

  return (
    <Context.Consumer>
      {({ theme: { headlineFont } }) => (
        <View style={{ backgroundColor: bgColour, order: 2, width: "100%" }}>
          <HeaderContainer style={styles.container}>
            <Label color={textColour} isVideo={hasVideo} label={label} />
            <HeadlineContainer
              accessibilityRole="heading"
              aria-level="1"
              style={[
                styles.articleHeadline,
                { color: txtColour },
                headlineFont ? { fontFamily: fonts[headlineFont] } : null
              ]}
            >
              {headline}
            </HeadlineContainer>
            <FlagsContainer>
              <Flags color={txtColour} flags={flags} />
            </FlagsContainer>
            <Standfirst color={txtColour} standfirst={standfirst} />
          </HeaderContainer>
        </View>
      )}
    </Context.Consumer>
  );
};

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
