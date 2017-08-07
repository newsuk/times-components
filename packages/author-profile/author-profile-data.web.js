import React from "react";
import { Linking, StyleSheet, View } from "react-native";
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

const AuthorProfile = props => {
  const data = props.data;
  const headerProps = {
    ...data.author,
    count: data.author.articles.count,
    onNext: url => Linking.openURL(url),
    onPrev: url => Linking.openURL(url),
    pageSize: props.pageSize,
    page: props.page
  };

  return (
    <View>
      <AuthorProfileHeader {...headerProps} />
      {data.author.articles.list.map((item, key) => {
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
    </View>
  );
};

AuthorProfile.propTypes = Object.assign(
  {},
  AuthorProfileFooter.propTypes,
  AuthorProfileHeader.propTypes,
  AuthorProfileItem.propTypes
);

export default AuthorProfile;
