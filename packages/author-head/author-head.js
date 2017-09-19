import React from "react";
import { Platform, View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";
import { renderTrees, treePropType } from "@times-components/markup";
import { TextLink } from "@times-components/link";
import withResponsiveStyle, { Breakpoints } from "@times-components/responsive-hoc";

import { withTrackEvents } from "@times-components/tracking";

const fontFamilyWebAndIos = "TimesDigitalW04";
const fontFamilyAndroid = "TimesDigitalW04-Regular";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        display: "flex"
      }
    }),
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#F9F8F3",
    paddingBottom: 50
  },
  photoContainer: {
    ...Platform.select({
      web: {
        order: 1
      }
    }),
    width: 100,
    height: 100,
    paddingTop: 16,
    paddingBottom: 16
  },
  roundImage: {
    width: 100,
    height: 100,
    borderColor: "#FFF",
    borderRadius: 50,
    borderWidth: 5,
    overflow: "hidden"
  },
  name: {
    fontFamily: "TimesModern-Bold",
    fontSize: 45,
    color: "#000",
    paddingTop: 32,
    ...Platform.select({
      web: {
        order: 2
      }
    })
  },
  title: {
    fontFamily: "TimesDigitalW04-RegularSC",
    fontSize: 15,
    color: "#696969",
    ...Platform.select({
      web: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        order: 3
      }
    })
  },
  twitter: {
    fontSize: 18,
    fontFamily: "GillSansMTStd-Medium",
    color: "#006699",
    paddingTop: 16,
    textDecorationLine: "none",
    ...Platform.select({
      web: {
        order: 4
      }
    })
  },
  bio: {
    fontFamily:
      Platform.OS === "android" ? fontFamilyAndroid : fontFamilyWebAndIos,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    maxWidth: "88%",
    paddingBottom: 32,
    order: 3,
    ...Platform.select({
      web: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
      }
    })
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 50
  }
});

const ResponsiveStyles = {
  web: {
    [Breakpoints.MEDIUM]: StyleSheet.create({
      photoContainer: {
        ...Platform.select({
          web: {
            order: 6
          }
        }),
        paddingTop: 0,
        paddingBottom: 0,
        bottom: -50,
        position: "absolute"
      }
    })
  }
};

const AuthorHead = props => {
  const { name, title, twitter, bio, uri, onTwitterLinkPress } = props;

  const imageComponent = uri ? (
    <View style={styles.photoContainer}>
      <Image uri={uri} style={styles.roundImage} aspectRatio={1 / 1} />
    </View>
  ) : null;

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View accessibilityRole="banner" style={styles.container}>
        <Text
          testID="author-name"
          accessibilityRole="heading"
          aria-level="1"
          style={styles.name}
        >
          {name}
        </Text>
        <Text accessibilityRole="heading" aria-level="2" style={[styles.title]}>
          {title.toLowerCase()}
        </Text>
        <TwitterLink handle={twitter} onPress={onTwitterLinkPress} />
        <Text style={[styles.bio]}>{renderTrees(bio)}</Text>
        <View style={[styles.photoContainer]}>
          <Image source={{ uri }} style={[styles.roundImage]} />
        </View>
      </View>
      {imageComponent}
    </View>
  );
};

AuthorHead.defaultProps = {
  name: "",
  title: "",
  uri: "",
  bio: [],
  twitter: null
};

AuthorHead.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  uri: PropTypes.string,
  bio: PropTypes.arrayOf(treePropType),
  twitter: PropTypes.string,
  onTwitterLinkPress: PropTypes.func.isRequired
};

const TwitterLink = ({ handle, onPress }) => {
  if (!handle) {
    return null;
  }
  const url = `https://twitter.com/${handle}`;

  return (
    <TextLink
      style={styles.twitter}
      url={url}
      onPress={e => onPress(e, { handle, url })}
    >
      @{handle}
    </TextLink>
  );
};

TwitterLink.propTypes = {
  handle: AuthorHead.propTypes.twitter,
  onPress: PropTypes.func.isRequired
};

TwitterLink.defaultProps = {
  handle: AuthorHead.defaultProps.twitter
};

export default withResponsiveStyle(
  withTrackEvents(AuthorHead, {
    analyticsEvents: [
      {
        eventName: "onTwitterLinkPress",
        actionName: "Pressed",
        trackingName: "TwitterLink",
        getAttrs: (props, eventArgs) => ({
          twitterHandle: props.twitter,
          url: eventArgs[1] && eventArgs[1].url
        })
      }
    ]
  }),
  ResponsiveStyles
);
