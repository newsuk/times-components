import AuthorHead from "@times-components/author-head";
import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorProfileGradient from "./author-profile-gradient";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F9F8F3",
    flexDirection: "column",
    minHeight: 264,
    paddingBottom: 50,
    width: "100%"
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
    borderWidth: 5,
    overflow: "hidden"
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 50
  }
});

const AuthorProfileAuthorHead = ({ isLoading, ...props }) => {
  if (isLoading) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container} />
        <View style={styles.photoContainer}>
          <View style={styles.roundImage}>
            <AuthorProfileGradient />
          </View>
        </View>
      </View>
    );
  }

  return <AuthorHead {...props} />;
};

AuthorProfileAuthorHead.propTypes = AuthorHead.propTypes;
export default AuthorProfileAuthorHead;
