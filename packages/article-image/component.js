import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "@times-components/image";
import Caption from "@times-components/caption";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

// NOTE: We support only Mobile web, ios and android. Desktop to follow after responsive design
const styles = StyleSheet.create({
  secondaryImage: {
    width: "50%"
  },
  secondaryCaption: {
    paddingLeft: 10,
    paddingTop: 0,
    width: "50%"
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

const ArticleImage = ({ imageOptions, captionOptions }) => {

  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
      [<View style={styles[`${display}Image`]}>
        <Image uri={url} aspectRatio={aspectRatio} />
      </View>,
      renderCaption(display, caption, credits)]
  );
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
