import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    maxWidth: 820,
    alignSelf: "center"
  }
});

const AuthorProfile = props =>
  <View>
    <AuthorProfileHeader {...props} />
    {props.articles.list.map((item, key) => {
      const separatorComponent = key > 0
        ? <AuthorProfileItemSeparator />
        : null;

      return (
        <View style={styles.container}>
          {separatorComponent}
          <AuthorProfileItem {...item} />
        </View>
      );
    })}
    <AuthorProfileFooter />
  </View>;

AuthorProfile.propTypes = Object.assign(
  {},
  AuthorProfileItem.propTypes,
  AuthorProfileHeader.propTypes
);

export default AuthorProfile;
