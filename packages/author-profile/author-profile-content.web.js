import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileFooter from "./author-profile-footer";
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
    {props.articles.list.map((article, key) => {
      const { id, url } = article;
      const separatorComponent =
        key > 0 ? <AuthorProfileItemSeparator /> : null;

      return (
        <View key={id} style={styles.container}>
          {separatorComponent}
          <AuthorProfileItem
            {...article}
            onPress={e => props.onArticlePress(e, { id, url })}
          />
        </View>
      );
    })}
    <AuthorProfileFooter {...props} />
  </View>
);

AuthorProfile.propTypes = Object.assign(
  { onArticlePress: PropTypes.func.isRequired },
  {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
    })
  },
  AuthorProfileHeader.propTypes
);

export default AuthorProfile;
