import React, { Component } from "react";
import AuthorHead from "@times-components/author-head";
import Gradient from "@times-components/gradient";
import { colours, spacing } from "@times-components/styleguide";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    minHeight: 264,
    width: "100%"
  },
  photoContainer: {
    width: 100,
    height: 100,
    top: spacing(6),
    position: "absolute"
  },
  gradient: {
    flex: 1
  },
  roundImage: {
    width: 100,
    height: 100,
    borderColor: colours.functional.contrast,
    borderRadius: 50,
    overflow: "hidden"
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

class AuthorProfileAuthorHead extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isLoading !== nextProps.isLoading;
  }

  render() {
    const { isLoading, ...props } = this.props;

    if (!isLoading) return <AuthorHead {...props} />;

    return (
      <View style={styles.wrapper}>
        <View style={styles.container} />
        <View style={styles.photoContainer}>
          <View style={styles.roundImage}>
            <Gradient style={styles.gradient} />
          </View>
        </View>
      </View>
    );
  }
}

AuthorProfileAuthorHead.propTypes = AuthorHead.propTypes;
export default AuthorProfileAuthorHead;
