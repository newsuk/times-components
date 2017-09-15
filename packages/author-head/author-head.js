import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";
import Markup from "@times-components/markup";
import Link from "@times-components/link";
import withResponsiveStyle, { Breakpoints } from "@times-components/responsive-hoc";

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 50
  },
  container: {
    display: 'flex',
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#F9F8F3",
    paddingBottom: 50
  },
  photoContainer: {
    "width": 100,
    "height": 100,
    "order": 1,
    "paddingTop": 16,
    "paddingBottom": 16
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
    paddingTop: 32,
    order: 2
  },
  title: {
    fontFamily: "TimesDigital-RegularSC",
    fontSize: 15,
    color: "#696969",
    order: 3
  },
  twitter: {
    fontSize: 18,
    fontFamily: "GillSansMTStd-Medium",
    color: "#006699",
    paddingTop: 16,
    textDecorationLine: "none",
    order: 4
  },
  bio: {
    fontFamily: "TimesDigital-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    maxWidth: "88%",
    paddingBottom: 32,
    order: 5
  }
});

const ResponsiveStyles = {
  web: {
    [Breakpoints.MEDIUM]: StyleSheet.create({
      photoContainer: {
        "display": "none"
      }
    }),
    [Breakpoints.LARGE]: StyleSheet.create({
      photoContainer: {
        "order": 6,
        "paddingTop": 0,
        "paddingBottom": 0,
        "bottom": -50,
        "position": "absolute"
      }
    })
  }
}

const AuthorHead = props => {
  const { name, title, twitter, bio, uri, responsive } = props;

  return (
    <View style={[styles.wrapper, responsive.wrapper]} pointerEvents="box-none">
      <View accessibilityRole="banner" style={[styles.container, responsive.container]}>
        <Text accessibilityRole="heading" aria-level="1" style={[styles.name, responsive.name]}>
          {name}
        </Text>
        <Text accessibilityRole="heading" aria-level="2" style={[styles.title, responsive.title]}>
          {title.toLowerCase()}
        </Text>
        <TwitterLink handle={twitter} />
        <Text style={[styles.bio, responsive.bio]}>
          <Markup ast={bio} wrapIn="paragraph" />
        </Text>
        <View style={[styles.photoContainer, responsive.photoContainer]}>
          <Image source={{ uri }} style={[styles.roundImage, responsive.roundImage]} />
        </View>
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

export default withResponsiveStyle(AuthorHead, ResponsiveStyles);
