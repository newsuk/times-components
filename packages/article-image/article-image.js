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
    flexDirection: "column"
  },
  secondaryContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  secondaryImageDesktop: {
    width: "70%"
  },
  secondaryCaptionDesktop: {
    width: "30%"
  },
  inlineDesktopWeb: {
    width: "35%",
    flexDirection: "column",
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 10
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
    flexWrap: "nowrap"
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

const getImageRatioBox = ratio => {
  const tokens = ratio.split(":");
  const padding = tokens[1] / tokens[0] * 100;

  return StyleSheet.create({
    ratioBox: {
      ...Platform.select({
        web: {
          height: 0,
          overflow: "hidden",
          paddingBottom: `${padding.toFixed(2)}%`,
          position: "relative"
        }
      })
    },
    ratioBoxInside: {
      ...Platform.select({
        web: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }
      })
    }
  });
};

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

  const source = {
    uri: url
  };

  const ratioStyle = getImageRatioBox(ratio);
  return (
    <View key={url} style={styles[`${display}Container`]}>
      <View style={styles[`${display}Image`]}>
        <View style={ratioStyle.ratioBox}>
          <View style={ratioStyle.ratioBoxInside}>
            <Image source={source} />
          </View>
        </View>
      </View>
      {renderCaption(display, caption, credits)}
    </View>
  );
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
