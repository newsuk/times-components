import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "@times-components/image";
import Caption from "@times-components/caption";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";
import { PrimaryContainer, SecondaryContainer, InlineContainer } from "./styles";

// NOTE: We support only Mobile web, ios and android. Desktop to follow after responsive design
const styles = StyleSheet.create({
  primaryContainer: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: 25
  },
  secondaryContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  secondaryImage: {
    width: "50%"
  },
  secondaryCaption: {
    paddingLeft: 10,
    paddingTop: 0,
    width: "50%"
  },
  inlineContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  inlineImage: {
    width: "50%"
  },
  inlineCaption: {
    width: "50%",
    paddingLeft: 10,
    paddingTop: 0
  }
});

const captionStyle = {
  secondary: {
    container: {
      paddingTop: 0
    }
  },
  inline: {
    container: {
      paddingTop: 0
    }
  }
};

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }
  return (
    <View style={styles[`${display}Caption`]}>
      <Caption text={caption} credits={credits} style={captionStyle[display]} />
    </View>
  );
};

const containerChooser = (imageType) => {
  switch(imageType) {
    case "primary": return PrimaryContainer;
    case "secondary": return SecondaryContainer;
    case "inline": return InlineContainer;
    default: return null;
  }
}

const ArticleImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  const ImageContainer = containerChooser(display);

  return (
    <ImageContainer key={url}>
      <View style={styles[`${display}Image`]}>
        <Image uri={url} aspectRatio={aspectRatio} />
      </View>
      {renderCaption(display, caption, credits)}
    </ImageContainer>
  );
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
