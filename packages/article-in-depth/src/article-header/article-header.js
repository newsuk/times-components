import React from "react";
import { Text, View } from "react-native";
import { ArticleFlags } from "@times-components/article-flag";
import Context from "@times-components/context";
import { fontFactory } from "@times-components/styleguide";
import { gqlRgbaToStyle } from "@times-components/utils";

import Label from "../article-label/article-label";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

const ArticleHeader = ({
  backgroundColour: rgbBackgroundColour,
  flags,
  hasVideo,
  headline,
  isTablet,
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
          style={[
            styles.container,
            { backgroundColor: backgroundColour, width: "100%" },
            isTablet && styles.containerTablet
          ]}
        >
          <Label color={textColour} isVideo={hasVideo} label={label} />
          <Text
            style={[
              styles.articleHeadline,
              {
                color: textColour,
                ...fontFactory({
                  font: headlineFont || "headline",
                  fontSize: isTablet ? "pageHeadline" : "headline"
                })
              }
            ]}
          >
            {headline}
          </Text>
          <View style={styles.flags}>
            <ArticleFlags color={textColour} flags={flags} />
          </View>
          <Standfirst color={textColour} standfirst={standfirst} />
        </View>
      )}
    </Context.Consumer>
  );
};

ArticleHeader.propTypes = {
  ...articleHeaderPropTypes
};

ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
