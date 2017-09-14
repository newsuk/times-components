import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";
import Markup from "@times-components/markup";
import Link from "@times-components/link";

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
    width: 100,
    height: 100,
    borderColor: "#FFF",
    borderRadius: 50,
    borderWidth: 5
  },
  name: {
    fontFamily: "TimesModern-Bold",
    fontSize: 45,
    color: "#000",
    paddingTop: 32
  },
  title: {
    fontFamily: "TimesDigital-RegularSC",
    fontSize: 15,
    color: "#696969"
  },
  twitter: {
    fontSize: 18,
    fontFamily: "GillSansMTStd-Medium",
    color: "#006699",
    paddingTop: 16,
    textDecorationLine: "none"
  },
  bio: {
    fontFamily: "TimesDigital-Regular",
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
  const { name, title, twitter, bio, uri } = props;

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View accessibilityRole="banner" style={styles.container}>
        <Text accessibilityRole="heading" aria-level="1" style={styles.name}>
          {name}
        </Text>
        <Text accessibilityRole="heading" aria-level="2" style={styles.title}>
          {title.toLowerCase()}
        </Text>
        <TwitterLink handle={twitter} />
        <Text style={styles.bio}>
          <Markup ast={bio} wrapIn="paragraph" />
        </Text>
      </View>
      <View style={styles.photoContainer}>
        <Image source={{ uri }} style={styles.roundImage} />
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
  bio: Markup.propTypes.ast,
  twitter: PropTypes.string
};

const TwitterLink = ({ handle }) => {
  if (!handle) {
    return null;
  }
  const target = `https://twitter.com/${handle}`;

  return (
    <Link style={styles.twitter} url={target}>
      @{handle}
    </Link>
  );
};

TwitterLink.propTypes = {
  handle: AuthorHead.propTypes.twitter
};

TwitterLink.defaultProps = {
  handle: AuthorHead.defaultProps.twitter
};

export default AuthorHead;
