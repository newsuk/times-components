import React from "react";
import { Text, View } from "react-native";
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
        <View
          style={[
            styles.container,
            { backgroundColor: bgColour, width: "100%" }
          ]}
        >
        <Label color={textColour} isVideo={hasVideo} label={label} />
          <Text
            style={[
              styles.articleHeadline,
              { color: txtColour },
              headlineFont ? { fontFamily: fonts[headlineFont] } : null
            ]}
          >
            {headline}
          </Text>
          <Flags color={textColour} flags={flags} />
          <Standfirst color={txtColour} standfirst={standfirst} />
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
