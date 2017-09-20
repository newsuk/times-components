import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    maxWidth: 820,
    alignSelf: "center"
  }
});

const AuthorProfile = props => (
  <View>
    <AuthorProfileHeader {...props} />
    {props.articles.list.map((item, key) => {
      const separatorComponent =
        key > 0 ? <AuthorProfileItemSeparator /> : null;

      return (
        <View testID={`articleList-${key}`} key={item.id} style={styles.container}>
          {separatorComponent}
          <AuthorProfileItem {...item} />
        </View>
      );
    })}
  </View>
);

AuthorProfile.propTypes = Object.assign(
  {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
    })
  },
  AuthorProfileHeader.propTypes
);

export default AuthorProfile;
