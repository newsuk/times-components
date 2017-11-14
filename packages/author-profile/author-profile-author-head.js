import AuthorHead from "@times-components/author-head";
import Gradient from "@times-components/gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F9F8F3",
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
  gradient: {
    flex: 1
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

class AuthorProfileAuthorHead extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name;
  }

  render() {
    const { isLoading, ...props } = this.props;
    if (isLoading) {
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

    return <AuthorHead {...props} />;
  }
}

AuthorProfileAuthorHead.propTypes = AuthorHead.propTypes;
export default AuthorProfileAuthorHead;
