import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";
import { TextLink } from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import { renderTrees, treePropType } from "@times-components/markup";

import AuthorTitle from "./author-title";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#F9F8F3",
    paddingBottom: 50
  },
  photoContainer: {
    width: 100,
    height: 100,
    bottom: 0,
    position: "absolute"
  },
  roundImage: {
    borderColor: "#FFF",
    borderRadius: 50,
    borderWidth: 5,
    overflow: "hidden"
  },
  name: {
    fontFamily: "TimesModern-Bold",
    fontSize: 45,
    color: "#000",
    paddingTop: 32
  },
  twitter: {
    fontSize: 18,
    fontFamily: "GillSansMTStd-Medium",
    color: "#006699",
    paddingTop: 16,
    textDecorationLine: "none"
  },
  bio: {
    fontFamily: "TimesDigitalW04",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    maxWidth: "88%",
    paddingBottom: 32
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 50
  }
});

const AuthorHead = props => {
  const { name, title, twitter, bio, uri, onTwitterLinkPress } = props;

  const imageComponent = uri ? (
    <View style={styles.photoContainer}>
      <Image uri={`${uri}`} style={styles.roundImage} aspectRatio={1} />
    </View>
  ) : null;

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View accessibilityRole="banner" style={styles.container}>
        <Text
          testID="author-name"
          accessibility-label="author-name"
          accessibilityRole="heading"
          aria-level="1"
          style={styles.name}
        >
          {name}
        </Text>
        <AuthorTitle title={title} />
        <TwitterLink handle={twitter} onPress={onTwitterLinkPress} />
        <Text style={styles.bio}>{renderTrees(bio)}</Text>
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

export default withTrackEvents(AuthorHead, {
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
});
