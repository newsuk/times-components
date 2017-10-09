import React from "react";
import { ScrollView, View } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const AuthorProfile = props =>
  <ScrollView testID="scroll-view">
    {props.articles.list.map((article, key) => {
      const { id, url } = article;
      const separatorComponent = key > 0
        ? <AuthorProfileItemSeparator />
        : null;

      return (
        <View key={id}>
          {separatorComponent}
          <AuthorProfileItem
            {...article}
            onPress={e => props.onArticlePress(e, { id, url })}
          />
        </View>
      );
    })}
  </ScrollView>;

AuthorProfile.propTypes = Object.assign({
  onArticlePress: PropTypes.func.isRequired,
  articles: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
  })
});

export default AuthorProfile;
