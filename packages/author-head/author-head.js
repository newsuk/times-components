import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import Image from "@times-components/image";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#F9F8F3"
  },
  photoContainer: {
    width: 100,
    height: 50,
    position: "relative"
  },
  roundImage: {
    width: 100,
    height: 100,
    backgroundColor: "#EFEFEF",
    borderColor: "#FFF",
    borderRadius: 50,
    borderWidth: 5
  },
  name: {
    fontFamily: "TimesModern-Bold",
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "400",
    color: "#1D1D1B"
  },
  title: {
    fontFamily: "TimesDigitalW04-RegularSC"
  },
  twitter: {
    fontSize: 15,
    fontFamily: "GillSansMTStd-Medium",
    color: "#069"
  },
  bio: {
    fontFamily: "TimesDigital-Regular",
    fontSize: 15,
    lineHeight: 25,
    marginTop: 6,
    color: "#333"
  }
});

const AuthorHead = props => {
  const { name, title, twitter, bio, uri } = props;

  return (
    <View accessibilityRole="banner" style={styles.container}>
      <Text accessibilityRole="heading" aria-level="1" style={styles.name}>
        {name}
      </Text>
      <Text accessibilityRole="heading" aria-level="2" style={styles.title}>
        {title.toLowerCase()}
      </Text>
      <Text style={styles.twitter}>{twitter}</Text>
      <Text style={styles.bio}>{bio}</Text>
      <View style={styles.photoContainer}>
        <Image aspectRatio={1} source={{ uri }} style={styles.roundImage} />
      </View>
    </View>
  );
};

AuthorHead.defaultProps = {
  name: "",
  title: "",
  bio: "",
  uri: "",
  twitter: ""
};

AuthorHead.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  bio: PropTypes.string,
  uri: PropTypes.string,
  twitter: PropTypes.string
};

export default AuthorHead;
