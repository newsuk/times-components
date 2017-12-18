import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";
import { TextLink } from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import { treePropType } from "@times-components/markup";

import AuthorTitle from "./author-title";
import TwitterIcon from "./twitter-icon";
import Bio from "./author-bio";
import AuthorName from "./author-name";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#F9F8F3",
    paddingTop: 20,
    paddingBottom: 30
  },
  photoContainer: {
    marginBottom: 20
  },
  roundImage: {
    width: 100,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#FFF",
    borderRadius: 50,
    borderWidth: 5,
    overflow: "hidden"
  },
  twitter: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
    ...Platform.select({
      android: {
        alignItems: "center"
      }
    })
  },
  twitterLink: {
    fontSize: 18,
    fontFamily: "GillSansMTStd-Medium",
    color: "#006699",
    textDecorationLine: "none",
    paddingLeft: 5
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent"
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
        {imageComponent}
        <AuthorName name={name} />
        <AuthorTitle title={title} />
        <TwitterLink handle={twitter} onPress={onTwitterLinkPress} />
        <Bio bio={bio} />
      </View>
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
    <View style={styles.twitter}>
      <TwitterIcon />
      <TextLink
        style={styles.twitterLink}
        url={url}
        onPress={e => onPress(e, { handle, url })}
      >
        @{handle}
      </TextLink>
    </View>
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
