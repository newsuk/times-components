import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Image from "@times-components/image";
import Caption from "@times-components/caption";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

// NOTE: We support only Mobile web, ios and android. Desktop to follow after responsive design
const styles = StyleSheet.create({
  primaryContainer: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: 25
  },
  secondaryContainer: {
    // width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "grey", //
    overflow: "hidden"
  },
  secondaryImage: {
    width: "50%",
    backgroundColor: "red", //
    ...Platform.select({
      web: {
        display: "block"
      },
      ios: {
        display: "flex"
      },
      android: {
        display: "flex"
      }
    })
  },
  secondaryCaption: {
    paddingLeft: 10,
    paddingTop: 0,
    width: "50%",
    backgroundColor: "green" //
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

const ArticleImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return (
    <View key={url} style={styles[`${display}Container`]}>
      <View style={styles[`${display}Image`]}>
        <Image uri={url} aspectRatio={aspectRatio} />
      </View>
      {renderCaption(display, caption, credits)}
    </View>
  );
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
