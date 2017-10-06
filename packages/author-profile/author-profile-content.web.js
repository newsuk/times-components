import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 820,
    alignSelf: "center"
  }
});

const AuthorProfile = ({ articles }) =>
  <View>
    {articles.map((article, key) => {
      const { id, url } = article;
      const separatorComponent = key > 0
        ? <AuthorProfileItemSeparator />
        : null;

      return (
        <View testID={`articleList-${key}`} key={id} style={styles.container}>
          {separatorComponent}
          <AuthorProfileItem
            {...article}
            onPress={e => props.onArticlePress(e, { id, url })}
          />
        </View>
      );
    })}
</View>;

AuthorProfile.propTypes = Object.assign(
  { onArticlePress: PropTypes.func.isRequired },
  {
    articles: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
  }
);

export default AuthorProfile;
