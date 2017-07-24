import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    maxWidth: 650,
    alignSelf: "center"
  }
})

const AuthorProfile = props =>
  <View>
    <AuthorProfileHeader {...props} />
    {props.currentPageOfArticles.map((item, key) => {
      const separatorComponent = key > 0 ? <AuthorProfileItemSeparator /> : null;
      return (
        <View style={styles.container}>
          {separatorComponent}
          <AuthorProfileItem {...item} />
        </View>
      )
    })}
    <AuthorProfileFooter />
  </View>;

AuthorProfile.propTypes = Object.assign(
  {},
  AuthorProfileFooter.propTypes,
  AuthorProfileHeader.propTypes,
  AuthorProfileItem.propTypes
);

export default AuthorProfile;
